import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

export default defineEventHandler(async (event) => {
    const { email }: any = event.context.params;

    const docRef = doc(firestore, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        await deleteDoc(doc(firestore, "users", email));
        setResponseStatus(event, 401);
        return { message: "User deleted" };
    } else {
        // docSnap.data() will be undefined in this case
        setResponseStatus(event, 401);
        return { message: "User not found" };
    }
});
