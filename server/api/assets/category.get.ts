import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { ICategory } from "~/types/category";
import { IApiResponse } from "~/types/common/response";

export default defineEventHandler(
  async (event): Promise<IApiResponse<ICategory[]>> => {
    const data: ICategory[] = [];
    const querySnapshot = await getDocs(
      query(collection(firestore, "category"))
    );
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), categoryId: doc.id } as ICategory);
    });
    return { data, message: "Success", status: 200 };
  }
);
