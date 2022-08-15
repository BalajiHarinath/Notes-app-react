import { AuthPropsType } from "../ContextTypes/AuthContextType"
import { Note } from "../NoteType"

export type Action = 
| {
    type: "LOGIN_SUCCESS",
    payload: {
        toastMessage: string,
        name: string,
        email: string,
        id: string,
    }
} 
| {
    type: "LOGIN_ERROR",
    payload:{
        toastMessage: string,
    },
}
| {
    type: "HANDLER_ERROR",
    payload:{
        toastMessage: string,
    },
}
| {
    type: "REMOVE_TOAST",
}
| {
    type: "LOGOUT",
    payload: {
        toastMessage: string,
        name: string,
        email: string,
        id: string,
    }
}
| {
    type: "GET_ALL_NOTES",
    payload: {
        data: Note[],
    }
}
| {
    type: "ADD_NOTE",
    payload: {
        toastMessage: string,
        data: Note[],
    }
}
| {
    type: "DELETE_NOTE",
    payload: {
        toastMessage: string,
        data: Note[],
    }
}
| {
    type: "UPDATE_NOTE",
    payload: {
        toastMessage: string,
        data: Note[],
    }
}
| {
    type: "ARCHIVE_NOTE",
    payload: {
        toastMessage: string,
        notesData: Note[],
        archivedData: Note[],
    }
}
| {
    type: "GET_ARCHIVED_NOTES",
    payload: {
        data: Note[],
    }
}
| {
    type: "DELETE_FROM_ARCHIVE",
    payload: {
        toastMessage: string,
        data: Note[],
    }
}
| {
    type: "RESTORE_FROM_ARCHIVE",
    payload: {
        toastMessage: string,
        notesData: Note[],
        archivedData: Note[],
    }
}
| {
    type: "MOVE_TO_TRASH",
    payload: {
        data: Note[],
    }
}
| {
    type: "RESTORE_FROM_TRASH",
    payload: {
        toastMessage: string,
        notesData: Note[],
        trashData: Note[],
    }
}
| {
    type: "DELETE_FROM_TRASH",
    payload: {
        toastMessage: string,
        data: Note[],
    }
}
