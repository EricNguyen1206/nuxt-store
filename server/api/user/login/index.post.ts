import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IResponse, IUser } from "~/types";

export default defineEventHandler(async (event): Promise<IResponse<IUser>> => {
    const { email, password } = await readBody(event);
    const docRef = doc(firestore, "account", email);
    const docSnap = await getDoc(docRef);
    console.log('docSnap.data()', docSnap.data())
    if (docSnap.exists() && docSnap.data().password === password) {
        const userSnap = await getDoc(docSnap.data().userId)
        // const roleSnap = await getDoc(doc(firestore, "role", docSnap.data().roleId))
        // const userSnap = collection(firestore, docSnap.)
        return {
            message: "Login success!",
            payload: { ...(userSnap.data() as Object), email } as IUser,
            status: 200,
        };
    }
    return { message: "Login fail!", status: 401, payload: null };
});
