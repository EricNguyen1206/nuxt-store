import { doc, getDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IResponse, IUser } from "~/types";

export default defineEventHandler(async (event): Promise<IResponse<IUser>> => {
    const { email, password } = await readBody(event);
    const docRef = doc(firestore, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().password == password) {
        return {
            message: "Login success!",
            payload: { ...docSnap.data(), email } as IUser,
            status: 200,
        };
    }
    return { message: "Login fail!", status: 401, payload: null };
});
