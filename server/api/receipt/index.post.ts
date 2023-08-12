import { addDoc, collection } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IBasicApiResponse } from "~/types/common/response";

export default defineEventHandler(async (event): Promise<IBasicApiResponse> => {
  const receipt = await readBody(event);

  try {
    await addDoc(collection(firestore, "receipt"), receipt);
    return { message: "Receipt created!", status: 200 };
  } catch (e: any) {
    return { message: e.message, status: 500 };
  }
});
