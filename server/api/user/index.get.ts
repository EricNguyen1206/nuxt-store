import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IUser } from "~/types";

export default defineEventHandler(async (event) => {
    let { page } = getQuery(event);
    const lim = 4;
    let q;
    page = Number(page) || 1;
    const start = (page - 1) * lim;
    q = query(collection(firestore, "users"), orderBy("created", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.docs) {
        const total = snapshot.docs.map((doc) => ({
            email: doc.id,
            ...doc.data(),
        })) as IUser[];
        const data = total.slice(start, start + lim);
        return { data, total: total.length };
    } else {
        // docSnap.data() will be undefined in this case
        return { data: [], total: 0 };
    }
});
