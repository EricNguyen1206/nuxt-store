import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IProduct } from "~/types";

/**
 * return all products in db
 */
export default defineEventHandler(async (event) => {
    const q = query(
        collection(firestore, "production"),
        orderBy("created", "desc")
    );
    const snapshot = await getDocs(q);

    if (snapshot.docs) {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as IProduct[];
        return { data, total: data.length };
    } else {
        // docSnap.data() will be undefined in this case
        return { data: [], total: 0 };
    }
});
