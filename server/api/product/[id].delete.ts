import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

export default defineEventHandler(async (event) => {
    const { id }: any = event.context.params;

    const docRef = doc(firestore, "production", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        await deleteDoc(doc(firestore, "production", id));
        return { message: "Product deleted", status: 200 };
    }
    return { message: "Product not found", status: 401 };
});
