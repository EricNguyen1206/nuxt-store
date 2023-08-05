import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

export default defineEventHandler(async (event) => {
    const { email }: any = event.context.params;
    const body: any = await readBody(event);

    const docRef = doc(firestore, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        await setDoc(doc(firestore, "users", email), body);
        setResponseStatus(event, 200);
        return { message: "User updated!" };
    } else {
        // docSnap.data() will be undefined in this case
        setResponseStatus(event, 401);
        return { message: "User not found" };
    }
});
