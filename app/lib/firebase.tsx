/* eslint no-use-before-define: 0 */  // --> OFF

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDTx6eLzBZ3HjOhvxfqE31jPNAxmo0t74s",
  authDomain: "auralis-b37cb.firebaseapp.com",
  projectId: "auralis-b37cb",
  storageBucket: "auralis-b37cb.firebasestorage.app",
  messagingSenderId: "101028264514",
  appId: "1:101028264514:web:96a0c50b6d52c25076cbdb",
  measurementId: "G-6KNG2H6739"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Sign in and sign out functions
const signIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Firestore functions
const saveStory = async (userId: string, story: any) => {
  try {
    await addDoc(collection(db, "savedStories"), {
      userId,
      ...story,
    });
  } catch (error) {
    console.error("Error saving story:", error);
  }
};

const getSavedStories = async (userId: string) => {
  const q = query(collection(db, "savedStories"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const removeSavedStory = async (storyId: string) => {
  try {
    await deleteDoc(doc(db, "savedStories", storyId));
  } catch (error) {
    console.error("Error deleting story:", error);
  }
};

export { auth, signIn, logOut, db, saveStory, getSavedStories, removeSavedStory };
