import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  onValue,
} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDuypCCjETZjWn0Z7PnzZOzUplWORd0gZk",
  authDomain: "wajjcard-7be7d.firebaseapp.com",
  databaseURL: "https://wajjcard-7be7d-default-rtdb.firebaseio.com",
  projectId: "wajjcard-7be7d",
  storageBucket: "wajjcard-7be7d.appspot.com",
  messagingSenderId: "981642627092",
  appId: "1:981642627092:web:f861e2da8cf66058c47f01"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const db=getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
