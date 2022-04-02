import { createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from ".";

const TrashContext = createContext();

const TrashProvider = ({children}) => {

    const { authState, authDispatch } = useAuth();
    const { trashedNotes } = authState;

    const config = {
        headers: {
          authorization: localStorage.getItem("tokenNotesApp"),
        },
      };

    const addToTrash = (note) => {
        const newTrashData = [...trashedNotes, note]
        authDispatch({type: "MOVE_TO_TRASH", payload: {data: newTrashData}})
    }   

    const restoreFromTrash = async(note) => {
        try{
            const response = await axios.post("/api/notes", { note: note }, config);
            if (response.status === 201) {
                let newTrashData = [...trashedNotes]
                newTrashData = newTrashData.filter((item) => item._id !== note._id)
                authDispatch({type: "RESTORE_FROM_TRASH", payload: { toastMessage: "Moved to all notes", notesData: response.data.notes, trashData: newTrashData}})
            }
            
        }catch(error){
            console.log(error)
        }      
    }

    const removeFromTrash = (_id) => {
        let newTrashData = [...trashedNotes]
        newTrashData = newTrashData.filter((item) => item._id !== _id)
        authDispatch({type: "DELETE_FROM_TRASH", payload: {toastMessage: "Deleted from trash",data: newTrashData}})
    }

    return(
        <TrashContext.Provider value={{addToTrash, restoreFromTrash, removeFromTrash}}>
            {children}
        </TrashContext.Provider>
    )   
}   

const useTrash = () => useContext(TrashContext);

export { TrashProvider, useTrash };