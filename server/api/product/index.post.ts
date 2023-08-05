import { addDoc, collection } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

export default defineEventHandler(async (event) => {
    const product = await readBody(event);

    try {
        await addDoc(collection(firestore, "production"), product);
        return { message: "Product created!", status: 200 };
    } catch (e: any) {
        return { message: e.message, status: 500 };
    }
});
