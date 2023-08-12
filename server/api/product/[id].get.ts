import { doc, getDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

export default defineEventHandler(async (event) => {
    const { id }: any = event.context.params;

    const docRef = doc(firestore, "product", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setResponseStatus(event, 200);
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        setResponseStatus(event, 401);
        return { message: "Product not found" };
    }
});
