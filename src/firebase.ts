import { Dispatch, SetStateAction } from "react";

import {
  collection,
  query,
  orderBy,
  Firestore,
  doc,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { User, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import { Todo } from "./types";

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

export const fetchTodos = async (
  user: User | null,
  setValue: Dispatch<SetStateAction<Todo[]>>
): Promise<void> => {
  console.log(user ? auth.currentUser?.uid : "guest");
  const data = await getDocs(
    fetchTodoListQuery(user ? auth.currentUser?.uid : "guest")
  );
  setValue(
    data.docs.map((doc) => ({
      id: doc.id,
      todo: doc.data().todo,
      isDone: doc.data().isDone,
      created_at: doc.data().created_at,
      deadLine: doc.data().deadLine,
    }))
  );
};

export const deleteTodo = async (
  id: string,
  user: User | null,
  setValue: Dispatch<SetStateAction<Todo[]>>
) => {
  await deleteDoc(todoDocRef(id));
  fetchTodos(user, setValue);
};

export const updateTodo = async (id: string, obj: any): Promise<void> => {
  console.log(obj);
  await updateDoc(todoDocRef(id), obj);
};
