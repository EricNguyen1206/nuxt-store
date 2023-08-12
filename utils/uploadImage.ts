import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage(
  initializeApp({
    apiKey: "AIzaSyAdvQTxQUXG2RuDiwAWagLtr0lxzBD3RKg",
    authDomain: "nuxt-store-4c385.firebaseapp.com",
    projectId: "nuxt-store-4c385",
    storageBucket: "nuxt-store-4c385.appspot.com",
    messagingSenderId: "514393926820",
    appId: "1:514393926820:web:ecb355313495d9aca9ca31",
  })
);

// Upload image file to firebase storage and return url
export const uploadImage = async (
  file: File,
  path: string
): Promise<string> => {
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
};
