import "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();

// Upload image file to firebase storage and return url
export default async function (file: File, path: string): Promise<string> {
    // Create a unique file name for the image
    const fileName = `${Date.now()}-${file.name}`;

    // Get a reference to the location where the image will be stored in Firebase Storage
    const storageRef = ref(storage, `${path}/${fileName}`);
    const metadata = {
        contentType: file.type,
    };
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file, metadata);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Return the download URL
    return downloadURL;
}
