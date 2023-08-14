import {
  collection,
  getDocs,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IProductDto } from "~/types/dto/product";
import { ICartDetailEntity, ICartEntity } from "~/types/entities/cart.entity";
import { IInventoryEntity } from "~/types/entities/inventory.entity";
import { IProductEntity } from "~/types/entities/product.entity";

/** Get user cart api */
export default defineEventHandler(async (event) => {
  const { userId }: any = event.context.params;
  const q = query(collection(firestore, "cart"), where("userId", "==", userId));
  const docSnap = await getDocs(q);
  if (docSnap.docs.length > 0) {
    const cart = {
      ...(docSnap.docs[0].data() as ICartEntity),
      cartId: docSnap.docs[0].id,
    };

    const cartDetails: IProductDto[] = [];
    const promises = docSnap.docs[0]
      .data()
      .cartDetails.map(async (item: ICartDetailEntity) => {
        const inventorySnap = await getDoc(
          doc(firestore, "inventory", item.inventoryId)
        );
        const productSnap = await getDoc(
          doc(firestore, "product", inventorySnap?.data()?.productId ?? "")
        );
        const { productId, colorId, sizeId } =
          inventorySnap.data() as IInventoryEntity;
        const {
          title,
          description,
          categoryId,
          tagId,
          image,
          price,
          basePrice,
        } = productSnap.data() as IProductEntity;
        cartDetails.push({
          productId,
          colorId,
          sizeId,
          quantity: item.quantity,
          title,
          description,
          categoryId,
          tagId,
          image,
          price,
          basePrice,
        } as IProductDto);
      });
    await Promise.all(promises);
    return { ...cart, cartDetails };
  }
});
