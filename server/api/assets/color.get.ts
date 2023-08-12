import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IColor } from "~/types/color";
import { IApiResponse } from "~/types/common/response";

export default defineEventHandler(
  async (event): Promise<IApiResponse<IColor[]>> => {
    const data: IColor[] = [];
    const querySnapshot = await getDocs(query(collection(firestore, "color")));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), colorId: doc.id } as IColor);
    });
    return { data, message: "Success", status: 200 };
  }
);
