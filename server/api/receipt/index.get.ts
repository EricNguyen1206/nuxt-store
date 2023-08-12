import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IApiListResponse } from "~/types/common/response";
import { IReceiptEntity } from "~/types/entities/receipt.entity";

export default defineEventHandler(
  async (event): Promise<IApiListResponse<IReceiptEntity>> => {
    let { page } = getQuery(event);
    const lim = 4;
    page = Number(page) || 1;
    const start = (page - 1) * lim;

    const snapshot = await getDocs(
      query(collection(firestore, "receipt"), orderBy("day"))
    );

    if (snapshot.docs) {
      const total = snapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as IReceiptEntity[];
      const data = total.slice(start, start + lim);
      return { data, total: total.length, message: "Success", status: 200 };
    } else {
      // docSnap.data() will be undefined in this case
      return { data: [], total: 0, message: "Error", status: 400 };
    }
  }
);
