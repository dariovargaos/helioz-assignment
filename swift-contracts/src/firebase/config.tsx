import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, Timestamp } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig: object = {
  apiKey: "AIzaSyCx-DIxAd7nVIPF9OqlVY9IYebBTmv-Xn8",
  authDomain: "swift-contracts-e0ed9.firebaseapp.com",
  projectId: "swift-contracts-e0ed9",
  storageBucket: "swift-contracts-e0ed9.appspot.com",
  messagingSenderId: "795599469427",
  appId: "1:795599469427:web:43d00337fee797fef06306",
};

//init firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

//init firestore db
const db: Firestore = getFirestore(app);

//init firestore auth
const auth: Auth = getAuth(app);

//init timestamp
const timestamp = Timestamp;

export { db, auth, timestamp };
