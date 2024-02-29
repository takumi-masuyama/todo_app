import {
  collection,
  query,
  orderBy,
  Firestore,
  doc,
  where,
} from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const todoColRef = collection(db, "todo");

export const todoDocRef = (id: string) => {
  return doc(db, "todo", id);
};

export const fetchTodoListQuery = (id?: string) => {
  return query(todoColRef, where("author.id", "==", id), orderBy("created_at"));
};
