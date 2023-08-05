import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IResponse, IUser } from "~/types";

export default defineEventHandler(async (event): Promise<IResponse<IUser>> => {
    const { avatar, email, username, password, isAdmin } = await readBody(
        event
    );

    try {
        const docRef = doc(firestore, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { message: "Resource exited!", status: 409, payload: null };
        } else {
            const newUser = {
                avatar,
                password,
                username,
                isAdmin: Boolean(isAdmin),
                created: new Date(),
            };
            await setDoc(doc(firestore, "users", email), newUser);
            return {
                message: "User created!",
                status: 200,
                payload: { ...newUser, email } as IUser,
            };
        }
    } catch (e: any) {
        return { message: e.message, status: 500, payload: null };
    }
});
