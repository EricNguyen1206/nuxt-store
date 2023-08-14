import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IUser } from "~/types";

export default defineEventHandler(async (event) => {
    const snapshot = await getDocs(
        query(collection(firestore, "users"), orderBy("created", "desc"))
    );

    if (snapshot.docs) {
        const data = snapshot.docs.map((doc) => ({
            email: doc.id,
            ...doc.data(),
        })) as IUser[];
        return { data, total: data.length };
    } else {
        // docSnap.data() will be undefined in this case
        return { data: [], total: 0 };
    }
});
