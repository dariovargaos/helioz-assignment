import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";

interface DocumentData {
  id: string;
  assignedClientsList: [];
  createdAt: string;
  details: string;
  duration: string;
  name: string;
  startDate: string;
}

interface DocumentError {
  message: string;
}

const fetchDocument = async (
  collectionName: string,
  id: string
): Promise<DocumentData | null> => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as DocumentData;
  } else {
    throw new Error("Cannot load contract.");
  }
};

export const useDocument = (collectionName: string, id: string) => {
  return useQuery<DocumentData | null, DocumentError>({
    queryKey: ["document", collectionName, id],
    queryFn: () => fetchDocument(collectionName, id),
    enabled: !!id,
  });
};
