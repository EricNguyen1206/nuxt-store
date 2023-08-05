import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IProduct } from "~/types";

export default defineEventHandler(async (event) => {
    let { category, page } = getQuery(event);
    const lim = 4;
    let q;
    page = Number(page) || 1;
    const start = (page - 1) * lim;
    if (category) {
        q = query(
            collection(firestore, "production"),
            where("category", "==", category + ""),
            orderBy("created")
        );
    } else {
        q = query(collection(firestore, "production"), orderBy("created"));
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
