import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

export default defineEventHandler(async (event) => {
    const { id }: any = event.context.params;
    const product = await readBody(event);

    const docRef = doc(firestore, "production", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        await setDoc(doc(firestore, "production", id), product);
        return { message: "Product updated!", status: 200 };
    }
    return { message: "Product not found", status: 401 };
});
