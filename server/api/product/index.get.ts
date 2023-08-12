import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IProduct } from "~/types";

export default defineEventHandler(async (event) => {
  let { categoryId, page, tagId } = getQuery(event);
  const lim = 4;
  let q;
  page = Number(page) || 1;
  const start = (page - 1) * lim;
  if (categoryId) {
    q = query(
      collection(firestore, "product"),
      where("categoryId", "==", categoryId),
      where("tagId", "==", tagId)
    );
  } else {
    q = query(collection(firestore, "product"), orderBy("updated"));
  }
  const snapshot = await getDocs(q);

  if (snapshot.docs) {
    const total = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IProduct[];
    const data = total.slice(start, start + lim);
    return { data, total: total.length };
  } else {
    // docSnap.data() will be undefined in this case
    return { data: [], total: 0 };
  }
});
