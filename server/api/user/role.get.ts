import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "~/server/plugins/firebase.server";
import { IRole } from "~/types/entities/account.entity";

export default defineEventHandler(async (event) => {
    const data: IRole[] = [];
    const querySnapshot = await getDocs(query(collection(firestore, "role")));
    querySnapshot.forEach(doc => {
        data.push({...doc.data(), roleId: doc.id} as IRole)
    })
    return data;
});
