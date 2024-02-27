import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";

interface DocumentError {
  message: string;
}

const fetchDocument = async <T,>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as T;
  } else {
    throw new Error("Cannot load contract.");
  }
};

export const useDocument = <T,>(collectionName: string, id: string) => {
  return useQuery<T | null, DocumentError>({
    queryKey: ["document", collectionName, id],
    queryFn: () => fetchDocument(collectionName, id),
    enabled: !!id,
  });
};
