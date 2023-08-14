import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IApiListResponse } from "~/types/common/response";
import { IInventoryDto } from "~/types/dto/inventory";
import { IInventoryEntity } from "~/types/entities/inventory.entity";
import { IProductEntity } from "~/types/entities/product.entity";

/** Get product inventory */
export default defineEventHandler(
  async (event): Promise<IApiListResponse<IInventoryDto>> => {
    const { productId }: any = event.context.params;

    const snapshot = await getDocs(
      query(
        collection(firestore, "inventory"),
        where("productId", "==", productId)
      )
    );
    const data: IInventoryDto[] = [];
    const productSnap = await getDoc(
      doc(firestore, "product", productId.toString())
    );

    const promises = snapshot.docs.map(async (inventory) => {
      const { productId, colorId, sizeId, quantity, updated } =
        inventory.data() as IInventoryEntity;
      const { categoryId, tagId, price, basePrice, image, title, description } =
        productSnap.data() as IProductEntity;
      data.push({
        inventoryId: inventory.id,
        productId,
        colorId,
        sizeId,
        quantity,
        updated,
        categoryId,
        tagId,
        price,
        basePrice,
        image,
        title,
        description,
      } as IInventoryDto);
      return "";
    });
    await Promise.all(promises);

    return { data, total: 0, message: "Success", status: 200 };
  }
);
