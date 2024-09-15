
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, query, where, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_fb_ApiKey,
  authDomain: "wedding-5497c.firebaseapp.com",
  projectId: "wedding-5497c",
  storageBucket: import.meta.env.VITE_fb_BucketID,
  messagingSenderId: "969684441445",
  appId: import.meta.env.VITE_fb_AppId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addOsa = async (names, coming, specialkost) => {
  const docRef = await addDoc(collection(db, "svar"), {
    namn: names,
    coming: coming,
    specialkost: specialkost
  });
}

export const GetGuestsList = async () => {
  const q = query(collection(db, "svar"));
  const querySnapshot = await getDocs(q);
  const guests = []
  querySnapshot.forEach((doc) => {
    guests.push(doc.data())
  });

  return guests;
}