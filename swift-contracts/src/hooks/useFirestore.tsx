import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { db, timestamp } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  DocumentReference,
  CollectionReference,
  updateDoc,
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

interface UpdateDocumentParams {
  id: string;
  updates: DocumentData;
}

export const useFirestore = (collectionName: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

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
        uid: user?.uid,
      });
      return addedDocumentRef;
    },
    onSuccess: () => {
      console.log("Document added successfully.");
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
      console.log("Document deleted successfully.");
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

  //update document mutation
  const updateDocumentMutation: UseMutationResult<
    void,
    Error,
    UpdateDocumentParams
  > = useMutation({
    mutationFn: async ({ id, updates }): Promise<void> => {
      const documentRef = doc(collectionRef, id);
      await updateDoc(documentRef, updates);
    },
    onSuccess: (_, { id }) => {
      console.log("Document updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [collectionName],
      });
      queryClient.invalidateQueries({
        queryKey: ["document", collectionName, id],
      });
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

  //update document
  const updateDocument = async (
    id: string,
    updates: DocumentData
  ): Promise<void> => {
    await updateDocumentMutation.mutateAsync({ id, updates });
  };

  return { addDocument, deleteDocument, updateDocument };
};
