import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IApiResponse } from "~/types/common/response";
import { ICartDto } from "~/types/dto/cart";
import { ICartEntity } from "~/types/entities/cart.entity";

/** Add product to cart api */
export default defineEventHandler(
  async (event): Promise<IApiResponse<ICartDto>> => {
    const { cartId, userId, inventoryId, quantity } = await readBody(event);
    try {
      const cartSnap = await getDoc(doc(firestore, "cart", cartId));
      if (cartSnap.exists()) {
        const newCart = cartSnap.data() as ICartEntity;
        const checkItem = newCart.cartDetails.findIndex(
          (item) => item.inventoryId === inventoryId
        );
        if (checkItem === -1) {
          newCart.cartDetails.push({ inventoryId, quantity });
        } else {
          newCart.cartDetails[checkItem].quantity += quantity;
        }
        updateDoc(doc(firestore, "cart", cartId), { ...newCart });
        return {
          message: "Product added!",
          status: 200,
          data: { cartId: cartId, userId, cartDetails: [] },
        };
      }
      const newCartData = { userId, cartDetails: [{ inventoryId, quantity }] };
      const newCartId = await addDoc(collection(firestore, "cart"), {
        ...newCartData,
      });
      return {
        message: "Product added!",
        status: 200,
        data: { ...newCartData, cartId: cartId ?? newCartId.id },
      };
    } catch (e: any) {
      return { message: e.message, status: 500 };
    }
  }
);
