import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import sha256 from "crypto-js/sha256";
import { IApiResponse } from "~/types/common/response";
import { IUserAccount, IUserEntity } from "~/types/entities/user.entity";
import { IUserDto } from "~/types/dto/user";

export default defineEventHandler(
  async (event): Promise<IApiResponse<IUserDto>> => {
    const { email, name, address, phone, roleId, password } = await readBody(
      event
    );

    try {
      const docRef = doc(firestore, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { message: "Resource exited!", status: 409, data: undefined };
      } else {
        const newUser: IUserEntity = {
          name,
          address,
          phone,
          created: new Date(),
        };
        const newUserId = await addDoc(collection(firestore, "user"), newUser);
        const newAccount: IUserAccount = {
          roleId,
          userId: newUserId.id,
          password: sha256(password).toString(),
        };
        await setDoc(doc(firestore, "account", email), newAccount);
        return {
          message: "User created!",
          status: 200,
          data: { ...newUser, userId: newUserId.id, email, roleId },
        };
      }
    } catch (e: any) {
      return { message: e.message, status: 500 };
    }
  }
);
