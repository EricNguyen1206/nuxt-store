import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

export default defineEventHandler(async (event) => {
    const { user } = await readBody(event);

    try {
        const docRef = doc(firestore, "users", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setResponseStatus(event, 409);
            return { message: "Resource exited!" };
        } else {
            await setDoc(doc(firestore, "users", user.email), {
                avatar: user.avatar,
                password: user.password,
                username: user.username,
                isAdmin: Boolean(user.isAdmin),
                created: new Date(),
            });
            setResponseStatus(event, 200);
            return { message: "User created!" };
        }
    } catch (e: any) {
        setResponseStatus(event, 500);
        return { message: e.message };
    }
});
