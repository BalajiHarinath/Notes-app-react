import { AuthState } from "../../Types/ContextTypes/AuthContextType";
import { Action } from "../../Types/ReducerTypes/ReducerType";

export const authReducer = (state: AuthState, action : Action) => {
  // const { type, payload } = action;
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,   
          status: "success",
        },
        signedIn: true,
        userName: action.payload.name,
        userEmail: action.payload.email,
        userID: action.payload.id,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "alert",
        },
      };

    case "HANDLER_ERROR":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "alert",
        },
      };

    case "REMOVE_TOAST":
      return { ...state, toastData: { ...state.toastData, display: false } };

    case "LOGOUT":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "alert",
        },
        signedIn: false,
        userName: action.payload.name,
        userEmail: action.payload.email,
        userID: action.payload.id,
      };

    //Notes context
    case "GET_ALL_NOTES":
      return {
        ...state,
        toastData: { ...state.toastData, display: false },
        notes: action.payload.data,
      };

    case "ADD_NOTE":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "success",
        },
        notes: action.payload.data,
      };

    case "DELETE_NOTE":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "alert",
        },
        notes: action.payload.data,
      };

    case "UPDATE_NOTE":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "success",
        },
        notes: action.payload.data,
      };

    case "ARCHIVE_NOTE":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "success",
        },
        notes: action.payload.notesData,
        archivedNotes: action.payload.archivedData,
      };

    //Archived context
    case "GET_ARCHIVED_NOTES":
      return {
        ...state,
        toastData: { ...state.toastData, display: false },
        archivedNotes: action.payload.data,
      };

    case "DELETE_FROM_ARCHIVE":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "alert",
        },
        archivedNotes: action.payload.data,
      };

    case "RESTORE_FROM_ARCHIVE":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "success",
        },
        notes: action.payload.notesData,
        archivedNotes: action.payload.archivedData,
      };

    //Trash Context
    case "MOVE_TO_TRASH":
      return { ...state, trashedNotes: action.payload.data };

    case "RESTORE_FROM_TRASH":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "success",
        },
        notes: action.payload.notesData,
        trashedNotes: action.payload.trashData,
      };

    case "DELETE_FROM_TRASH":
      return {
        ...state,
        toastData: {
          display: true,
          data: action.payload.toastMessage,
          status: "alert",
        },
        trashedNotes: action.payload.data,
      };

    default:
      return { ...state };
  }
};
