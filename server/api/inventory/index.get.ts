import {
  Timestamp,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IApiListResponse } from "~/types/common/response";
import { IInventoryDto } from "~/types/dto/inventory";
import { IInventoryEntity } from "~/types/entities/inventory.entity";

export default defineEventHandler(
  async (event): Promise<IApiListResponse<IInventoryDto>> => {
    let { page } = getQuery(event);
    const lim = 4;
    page = Number(page) || 1;
    const start = (page - 1) * lim;

    const snapshot = await getDocs(
      query(collection(firestore, "inventory"), orderBy("updated"))
    );

    const products = await getDocs(query(collection(firestore, "product")));

    if (snapshot.docs) {
      const total: IInventoryEntity[] = [];
      snapshot.forEach((doc) => {
        const info = doc.data();
        total.push({
          ...info,
          inventoryId: doc.id,
          updated: info.updated.toDate(),
        } as IInventoryEntity);
      });

      // const total = snapshot.docs.map((doc) => {
      //   const updated = doc.data().updated;
      //   return {
      //     ...doc.data(),
      //     inventoryId: doc.id,
      //     updated: updated.toDate(),
      //   };
      // }) as IInventoryEntity[];
      const response = total.map((inventory) => {
        const productData = products.docs.find(
          (item) => item.id === inventory.productId
        );
        return { ...inventory, ...productData?.data() } as IInventoryDto;
      });
      const data = response.slice(start, start + lim);
      return { data, total: total.length, message: "Success", status: 200 };
    } else {
      // docSnap.data() will be undefined in this case
      return { data: [], total: 0, message: "Error", status: 400 };
    }
  }
);
