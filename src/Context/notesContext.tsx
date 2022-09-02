import axios from "axios";
import React, { createContext, useContext } from "react";
import { NotePropsType } from "Types/ContextTypes/NoteContextType";
import { Note } from "../Types/NoteType";
import { useAuth, useTrash } from ".";

const NotesContext = createContext({} as NotePropsType);

const config = {
  headers: {
    authorization: localStorage.getItem("tokenNotesApp"),
  },
};

export const getNote = async () => {
  try {
    const response = await axios.get("/api/notes", config);
    if (response.status === 200) {
      return response.data.notes;
    }
  } catch (error) {
    console.log(error);
    return "Handler error";
  }
};

export const addNotes = async (note: Note) => {
  try {
    const response = await axios.post("/api/notes", { note: note }, config);
    if (response.status === 201) {
      return response.data.notes;
    } else if (response.status === 404) {
      return "The email is not Registered";
    }
  } catch (error) {
    console.log(error);
    return "Handler error";
  }
};

export const deleteNotes = async (_id: string, item: Note) => {
  try {
    const response = await axios.delete(`/api/notes/${_id}`, config);
    if (response.status === 200) {
      return response.data.notes;
    } else if (response.status === 404) {
      return "The email is not Registered";
    }
  } catch (error) {
    console.log(error);
    return "Handler error";
  }
};

export const updateNotes = async (_id: string, note: Note) => {
  try {
    const response = await axios.post(
      `/api/notes/${_id}`,
      { note: note },
      config
    );
    if (response.status === 201) {
      return response.data.notes;
    } else if (response.status === 404) {
      return "The email is not Registered";
    }
  } catch (error) {
    console.log(error);
    return "Handler error";
  }
};

export const archiveNotes = async (_id: string, note: Note) => {
  try {
    const response = await axios.post(
      `/api/notes/archives/${_id}`,
      { note: note },
      config
    );
    if (response.status === 201) {
      return {
        notesData: response.data.notes,
        archivedData: response.data.archivedNotes,
      };
    } else if (response.status === 404) {
      return "The email is not Registered";
    }
  } catch (error) {
    console.log(error);
    return "Handler error";
  }
};

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { authDispatch } = useAuth();
  const { addToTrash } = useTrash();

  const getNotes = async () => {
    try {
      const response = await axios.get("/api/notes", config);
      if (response.status === 200) {
        authDispatch({
          type: "GET_ALL_NOTES",
          payload: { data: response.data.notes },
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

  const addNote = async (note: Note) => {
    try {
      const response = await axios.post("/api/notes", { note: note }, config);
      if (response.status === 201) {
        authDispatch({
          type: "ADD_NOTE",
          payload: { toastMessage: "Note Added", data: response.data.notes },
        });
      } else if (response.status === 404) {
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

  const deleteNote = async (_id: string, item: Note) => {
    try {
      const response = await axios.delete(`/api/notes/${_id}`, config);
      if (response.status === 200) {
        addToTrash(item);
        authDispatch({
          type: "DELETE_NOTE",
          payload: {
            toastMessage: "Note moved to trash",
            data: response.data.notes,
          },
        });
      } else if (response.status === 404) {
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

  const updateNote = async (_id: string, note: Note) => {
    try {
      const response = await axios.post(
        `/api/notes/${_id}`,
        { note: note },
        config
      );
      if (response.status === 201) {
        authDispatch({
          type: "UPDATE_NOTE",
          payload: { toastMessage: "Note Updated", data: response.data.notes },
        });
      } else if (response.status === 404) {
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

  const archiveNote = async (_id: string, note: Note) => {
    try {
      const response = await axios.post(
        `/api/notes/archives/${_id}`,
        { note: note },
        config
      );
      if (response.status === 201) {
        authDispatch({
          type: "ARCHIVE_NOTE",
          payload: {
            toastMessage: "Note Archived",
            notesData: response.data.notes,
            archivedData: response.data.archives,
          },
        });
      } else if (response.status === 404) {
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
    <NotesContext.Provider
      value={{ getNotes, addNote, deleteNote, updateNote, archiveNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
