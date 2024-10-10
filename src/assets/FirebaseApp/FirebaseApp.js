import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { getMetadata } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_fb_ApiKey,
  authDomain: "wedding-5497c.firebaseapp.com",
  projectId: "wedding-5497c",
  storageBucket: import.meta.env.VITE_fb_BucketID,
  messagingSenderId: "969684441445",
  appId: import.meta.env.VITE_fb_AppId
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Firestore function for adding document
export const addOsa = async (names, coming, specialkost) => {
  const docRef = await addDoc(collection(db, "svar"), {
    namn: names,
    coming: coming,
    specialkost: specialkost
  });
};

// Firestore function for retrieving guest list
export const GetGuestsList = async () => {
  const q = query(collection(db, "svar"));
  const querySnapshot = await getDocs(q);
  const guests = [];
  querySnapshot.forEach((doc) => {
    guests.push(doc.data());
  });
  return guests;
};

// Firebase Storage function to upload an image and return its download URL
export const handleUpload = async (file) => {
  if (!file) throw new Error("No file provided");
  const timestamp = Date.now();

  const metadata = {
    contentType: file.type, // Sets the MIME type automatically from the file
    customMetadata: {
      date: timestamp,
      description: "Date uploaded",
    },
  };

  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file, metadata);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL; // URL for the uploaded image
};

export const getAllImages = async () => {
  const myImages = [];
  const listRef = ref(storage, 'images/');

  try {
    const response = await listAll(listRef);
    for (const item of response.items) {
      const url = await getDownloadURL(item);
      const metadata = await getMetadata(item); // Fetch metadata for each item

      myImages.push({
        url,
        metadata: metadata.customMetadata, // Add custom metadata to the image object
      });
    }

    // Sort images by date in descending order (newest first)
    myImages.sort((a, b) => {
      return new Date(b.metadata.date) - new Date(a.metadata.date);
    });

  } catch (error) {
    console.error("Error fetching images:", error);
  }

  return myImages;
};
