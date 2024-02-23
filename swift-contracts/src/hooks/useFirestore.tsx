import { useMutation } from "@tanstack/react-query";
import { db, timestamp } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

export const useFirestore = (collectionName: string) => {
  const toast = useToast();

  //collection ref
  const collectionRef: CollectionReference = collection(db, collectionName);

  // add a document mutation
  const addDocumentMutation = useMutation<DocumentReference<void>, any, object>(
    {
      mutationFn: async (doc: object): Promise<DocumentReference<void>> => {
        const createdAt = timestamp.fromDate(new Date());
        const addedDocumentRef = await addDoc(collectionRef, {
          ...doc,
          createdAt: createdAt,
        });
        return addedDocumentRef as DocumentReference<void>;
      },
      onSuccess: () => {
        toast({
          title: "Client added.",
          description: "Successfully added client.",
          status: "success",
          variant: "customSuccess",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  // delete a document mutation
  const deleteDocumentMutation = useMutation<void, any, { id: string }>({
    mutationFn: async ({ id }): Promise<void> => {
      await deleteDoc(doc(collectionRef, id));
    },
    onSuccess: () => {},
  });

  //add document
  const addDocument = async (doc: object): Promise<void> => {
    await addDocumentMutation.mutateAsync(doc);
  };

  //delete document
  const deleteDocument = async (id: string): Promise<void> => {
    await deleteDocumentMutation.mutateAsync({ id });
  };

  return { addDocument, deleteDocument };
};
