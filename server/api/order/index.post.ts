import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";

/** create order */
export default defineEventHandler(
  async (event): Promise<{ message: string; status: number }> => {
    const { order, cartId } = await readBody(event);

    try {
      const cartSnap = await getDoc(doc(firestore, "cart", cartId));
      const newCartData = cartSnap.data();

      const promises = order.orderDetails.map(
        async (detail: { inventoryId: string; quantity: number }) => {
          const inventorySnap = await getDoc(
            doc(firestore, "inventory", detail.inventoryId)
          );
          return await updateDoc(
            doc(firestore, "inventory", detail.inventoryId),
            {
              ...inventorySnap.data(),
              quantity: inventorySnap.data()?.quantity - detail.quantity,
            }
          );
        }
      );
      updateDoc(doc(firestore, "cart", cartId), {
        ...newCartData,
        cartDetails: [],
      });

      console.log("first");
      await Promise.all(promises.flat());
      console.log("sec");

      return { message: "Order created!", status: 200 };
    } catch (e: any) {
      return { message: e.message, status: 500 };
    }
  }
);
