import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IApiResponse } from "~/types/common/response";
import { ITag } from "~/types/tag";

export default defineEventHandler(
  async (event): Promise<IApiResponse<ITag[]>> => {
    const data: ITag[] = [];
    const querySnapshot = await getDocs(query(collection(firestore, "tag")));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), tagId: doc.id } as ITag);
    });
    return { data, message: "Success", status: 200 };
  }
);
