import React, { createContext, useContext } from "react";
import axios from "axios";
import { TrashPropsType } from "Types/ContextTypes/TrashContextType";
import { Note } from "../Types/NoteType";
import { useAuth } from ".";

const TrashContext = createContext({} as TrashPropsType);

const config = {
  headers: {
    authorization: localStorage.getItem("tokenNotesApp"),
  },
};

export const restoredFromTrash = async (note: Note) => {
  try {
    const response = await axios.post("/api/notes", { note: note }, config);
    if (response.status === 201) {
      return response.data.notes;
    }
  } catch (error) {
    console.log(error);
  }
};

const TrashProvider = ({ children }: { children: React.ReactNode }) => {
  const { authState, authDispatch } = useAuth();
  const { trashedNotes } = authState;

  const addToTrash = (note: Note) => {
    const newTrashData = [...trashedNotes, note];
    authDispatch({ type: "MOVE_TO_TRASH", payload: { data: newTrashData } });
  };

  const restoreFromTrash = async (note: Note) => {
    try {
      const response = await axios.post("/api/notes", { note: note }, config);
      if (response.status === 201) {
        let newTrashData = [...trashedNotes];
        newTrashData = newTrashData.filter((item) => item._id !== note._id);
        authDispatch({
          type: "RESTORE_FROM_TRASH",
          payload: {
            toastMessage: "Moved to all notes",
            notesData: response.data.notes,
            trashData: newTrashData,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromTrash = (_id: string) => {
    let newTrashData = [...trashedNotes];
    newTrashData = newTrashData.filter((item) => item._id !== _id);
    authDispatch({
      type: "DELETE_FROM_TRASH",
      payload: { toastMessage: "Deleted from trash", data: newTrashData },
    });
  };

  return (
    <TrashContext.Provider
      value={{ addToTrash, restoreFromTrash, removeFromTrash }}
    >
      {children}
    </TrashContext.Provider>
  );
};

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };
