import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
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

interface DocumentData {
  [key: string]: any;
}

interface AddDocumentParams {
  doc: DocumentData;
}

interface DeleteDocumentParams {
  id: string;
}

export const useFirestore = (collectionName: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  //collection ref
  const collectionRef: CollectionReference<DocumentData> = collection(
    db,
    collectionName
  );

  // add a document mutation
  const addDocumentMutation: UseMutationResult<
    DocumentReference<DocumentData>,
    Error,
    AddDocumentParams
  > = useMutation({
    mutationFn: async ({ doc }): Promise<DocumentReference<DocumentData>> => {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocumentRef = await addDoc(collectionRef, {
        ...doc,
        createdAt: createdAt,
      });
      return addedDocumentRef;
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
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `An error occurred: ${error.message}`,
        status: "error",
        variant: "customSuccess",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // delete a document mutation
  const deleteDocumentMutation: UseMutationResult<
    void,
    Error,
    DeleteDocumentParams
  > = useMutation({
    mutationFn: async ({ id }): Promise<void> => {
      await deleteDoc(doc(collectionRef, id));
    },
    onSuccess: () => {
      toast({
        title: "Document deleted.",
        description: "Successfully deleted the document.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: [collectionName] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `An error occurred: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  //add document
  const addDocument = async (doc: DocumentData): Promise<void> => {
    await addDocumentMutation.mutateAsync({ doc });
  };

  //delete document
  const deleteDocument = async (id: string): Promise<void> => {
    await deleteDocumentMutation.mutateAsync({ id });
  };

  return { addDocument, deleteDocument };
};
