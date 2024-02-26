import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useCollection = (collectionName: string) => {
  const { user } = useAuthContext();

  const fetchCollectionData = async () => {
    if (!user?.uid) {
      throw new Error("User not authenticated.");
    }
    const q = query(
      collection(db, collectionName),
      where("uid", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  return useQuery({
    queryKey: [collectionName, user?.uid],
    queryFn: fetchCollectionData,
    enabled: !!user?.uid,
  });
};
