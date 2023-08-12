import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IApiResponse } from "~/types/common/response";
import { ISize } from "~/types/size";

export default defineEventHandler(
  async (event): Promise<IApiResponse<ISize[]>> => {
    const data: ISize[] = [];
    const querySnapshot = await getDocs(query(collection(firestore, "size")));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), sizeId: doc.id } as ISize);
    });
    return { data, message: "Success", status: 200 };
  }
);
