import axios from "axios";
import { createContext, useContext } from "react";
import { useAuth } from ".";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const { authDispatch } = useAuth();

  const config = {
    headers: {
      authorization: localStorage.getItem("tokenNotesApp"),
    },
  };

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
    }
  };

  const addNote = async (note) => {
    try {
      const response = await axios.post("/api/notes", { note: note }, config);
      if (response.status === 201) {
        authDispatch({
          type: "ADD_NOTE",
          payload: { toastMessage: "Note Added", data: response.data.notes },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (_id) => {
    try {
      const response = await axios.delete(`/api/notes/${_id}`, config);
      if (response.status === 200) {
        authDispatch({
          type: "DELETE_NOTE",
          payload: { toastMessage: "Note Deleted", data: response.data.notes },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (_id, note) => {
    console.log(_id, note);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const archiveNote = async (_id, note) => {
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
      }
    } catch (error) {
      console.log(error);
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
