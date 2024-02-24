import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const fetchCollectionData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const useCollection = (collectionName: string) => {
  return useQuery({
    queryKey: [collectionName],
    queryFn: () => fetchCollectionData(collectionName),
  });
};
