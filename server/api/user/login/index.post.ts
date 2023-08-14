import sha256 from "crypto-js/sha256";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IApiResponse } from "~/types/common/response";
import { IUserDto } from "~/types/dto/user";
import { IRoleEntity } from "~/types/entities/role.entity";
import { IUserEntity } from "~/types/entities/user.entity";

export default defineEventHandler(
  async (event): Promise<IApiResponse<IUserDto>> => {
    const { email, password } = await readBody(event);
    const accountRef = doc(firestore, "account", email);
    const accountSnap = await getDoc(accountRef);
    if (
      accountSnap.exists() &&
      accountSnap.data().password === sha256(password).toString()
    ) {
      const userSnap = await getDoc(
        doc(firestore, "user", accountSnap.data().userId)
      );
      const roleSnap = await getDoc(
        doc(firestore, "role", accountSnap.data().roleId)
      );
      return {
        message: "Login success!",
        data: {
          ...(userSnap.data() as IUserEntity),
          role: { ...(roleSnap.data() as IRoleEntity) }.role,
          userId: userSnap.id,
          email,
        } as IUserDto,
        status: 200,
      };
    }
    return { message: "Login fail!", status: 401 };
  }
);
