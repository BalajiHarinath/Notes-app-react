import axios from "axios";
import React, { createContext, useContext } from "react";
import { useAuth, useTrash } from ".";
import { ArchivePropsType } from "../Types/ContextTypes/ArchiveContextType";
import { Note } from "../Types/NoteType";

const ArchiveContext = createContext({} as ArchivePropsType);

const ArchiveProvider = ({ children }: { children : React.ReactNode }) => {
  const { authDispatch } = useAuth();
  const { addToTrash } = useTrash();
  const config = {
    headers: {
      authorization: localStorage.getItem("tokenNotesApp"),
    },
  };

  const getArchivedNotes = async () => {
    try {
      const response = await axios.get("/api/archives", config);
      if (response.status === 200) {
        authDispatch({
          type: "GET_ARCHIVED_NOTES",
          payload: { data: response.data.archives },
        });
      }
      else if (response.status === 404) {
        authDispatch({
          type: "HANDLER_ERROR",
          payload: { toastMessage: "The email is not Registered" },
        });
      }
    } catch (error) {
      console.log(error);
      authDispatch({
        type: "HANDLER_ERROR",
        payload: { toastMessage: "Handler error" },
      });
    }
  };

  const deleteFromArchive = async (_id: string, note: Note) => {
    try {
      const response = await axios.delete(
        `/api/archives/delete/${_id}`,
        config
      );
      if (response.status === 200) {
        addToTrash(note)
        authDispatch({
          type: "DELETE_FROM_ARCHIVE",
          payload: {
            toastMessage: "Archived note moved to trash",
            data: response.data.archives,
          },
        });
      }
      else if (response.status === 404) {
        authDispatch({
          type: "HANDLER_ERROR",
          payload: { toastMessage: "The email is not Registered" },
        });
      }
    } catch (error) {
      console.log(error);
      authDispatch({
        type: "HANDLER_ERROR",
        payload: { toastMessage: "Handler error" },
      });
    }
  };

  const restoreFromArchive = async (_id: string) => {
    try {
      const response = await axios.post(
        `/api/archives/restore/${_id}`,
        {},
        config
      );
      if (response.status === 200) {
        authDispatch({
          type: "RESTORE_FROM_ARCHIVE",
          payload: {
            toastMessage: "Moved to all notes",
            notesData: response.data.notes,
            archivedData: response.data.archives,
          },
        });
      }
      else if (response.status === 404) {
        authDispatch({
          type: "HANDLER_ERROR",
          payload: { toastMessage: "The email is not Registered" },
        });
      }
    } catch (error) {
      console.log(error);
      authDispatch({
        type: "HANDLER_ERROR",
        payload: { toastMessage: "Handler error" },
      });
    }
  };

  return (
    <ArchiveContext.Provider
      value={{ getArchivedNotes, deleteFromArchive, restoreFromArchive }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

const useArchive = () => useContext(ArchiveContext);

export { ArchiveProvider, useArchive };
