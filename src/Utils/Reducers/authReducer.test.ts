import { AuthState } from "Types/ContextTypes/AuthContextType";
import { Action } from "Types/ReducerTypes/ReducerType";
import { authReducer } from "./authReducer";

describe("testing reducers", () => {
    //Auth Tests
    it("should set the user details when logged in", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        }

        const setLoginDetails: Action = {
            type: "LOGIN_SUCCESS",
            payload: {
                toastMessage: "Signed up",
                name: "Balaji",
                email: "balaji@gmail.com",
                id: "1234",
            }
        }

        const state: AuthState = authReducer(initialState, setLoginDetails);
        expect(state).toEqual({
            toastData: {   
                display: true,         
                data: "Signed up",
                status: "success",
              },
            signedIn: true,
            userName: "Balaji",
            userEmail: "balaji@gmail.com",
            userID: "1234",
        })
    })

    it("should display an error message when wrong credentials are entered", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        }

        const LoginErrorState: Action = {
            type: "LOGIN_ERROR",
            payload: {
                toastMessage: "Login Error",
            }
        }

        const state: AuthState = authReducer(initialState, LoginErrorState);

        expect(state).toEqual({
            toastData: {   
                display: true,         
                data: "Login Error",
                status: "alert",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        })
    })

    it("should display an error message when wrong credentials are entered", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        }

        const HandlerErrorState: Action = {
            type: "HANDLER_ERROR",
            payload: {
                toastMessage: "Handler Error",
            }
        }

        const state: AuthState = authReducer(initialState, HandlerErrorState);

        expect(state).toEqual({
            toastData: {   
                display: true,         
                data: "Handler Error",
                status: "alert",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        })
    })

    it("should remove the toast", () => {
        const initialState = {
            toastData: {
                display: true,
                data: "",
                status: "",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        }

        const RemoveToastState: Action = {
            type: "REMOVE_TOAST",
            payload: {},
        }

        const state: AuthState = authReducer(initialState, RemoveToastState)

        expect(state).toEqual({
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        })
    })

    it("should logout when the user logouts", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
        }

        const LoggedOutState: Action = {
            type: "LOGOUT",
            payload: {
                toastMessage: "Logged out",
                name: "",
                email: "",
                id: "",
            }
        }

        const state: AuthState = authReducer(initialState, LoggedOutState);

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "Logged out",
                status: "alert",
              },
              signedIn: false,
              userName: "",
              userEmail: "",
              userID: "",
        })
    })

    //Notes test
    it("should get all the notes", () => {
        const initialState = {
            toastData: {
                display: true,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [],
        }

        const GetNotesState: Action = {
            type: "GET_ALL_NOTES",
            payload: {
                data: [
                    {
                        _id: "1234",
                        pinned: true,
                        title: "read books",
                        description: "Harry Potter",
                        tag: "Home",
                        priority: "Low",
                        selectedBackgroundColor: "blue",
                        createdDate: "26/08/2022",
                        createdTime: "12:26", 
                    }],
                }
        }


        const state: AuthState = authReducer(initialState, GetNotesState)

        expect(state).toEqual({
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [
                {_id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26", }
              ]  
        })
    })

    it("should add a new note", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [{
                _id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
              }],
        }

        const AddNoteState: Action = {
            type: "ADD_NOTE",
            payload: {
                toastMessage: "Note added",
                data: [{
                    _id: "1235",
                    pinned: false,
                    title: "meetings",
                    description: "project meeting",
                    tag: "Office",
                    priority: "High",
                    selectedBackgroundColor: "violet",
                    createdDate: "25/08/2022",
                    createdTime: "11:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, AddNoteState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "Note added",
                status: "success",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [
               {
                    _id: "1235",
                    pinned: false,
                    title: "meetings",
                    description: "project meeting",
                    tag: "Office",
                    priority: "High",
                    selectedBackgroundColor: "violet",
                    createdDate: "25/08/2022",
                    createdTime: "11:26",
                }
            ],
        })
    })

    it("should delete a note", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [{
                _id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
              }],
        }

        const DeleteNoteState: Action = {
            type: "DELETE_NOTE",
            payload: {
                toastMessage: "Note deleted",
                data: [{
                    _id: "1234",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, DeleteNoteState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "Note deleted",
                status: "alert",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [
                {_id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",}
            ],
        })
    })

    it("should update a note", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [{
                _id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
              }],
        }

        const UpdateNoteState: Action = {
            type: "UPDATE_NOTE",
            payload: {
                toastMessage: "Note updated",
                data: [{
                    _id: "1234",
                    pinned: true,
                    title: "read books",
                    description: "Leo Tolstoy",
                    tag: "Home",
                    priority: "Medium",
                    selectedBackgroundColor: "red",
                    createdDate: "24/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, UpdateNoteState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "Note updated",
                status: "success",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [
                {_id: "1234",
                pinned: true,
                title: "read books",
                description: "Leo Tolstoy",
                tag: "Home",
                priority: "Medium",
                selectedBackgroundColor: "red",
                createdDate: "24/08/2022",
                createdTime: "12:26",}
            ],
        })
    })

    //Archived Notes

    it("should archive a note", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [{
                _id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
              }],
        }

        const ArchiveNoteState: Action = {
            type: "ARCHIVE_NOTE",
            payload: {
                toastMessage: "Note archived",
                notesData: [{
                    _id: "1234",
                    pinned: true,
                    title: "read books",
                    description: "Leo Tolstoy",
                    tag: "Home",
                    priority: "Medium",
                    selectedBackgroundColor: "red",
                    createdDate: "24/08/2022",
                    createdTime: "12:26",
                }],
                archivedData: [{
                    _id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }]
            }
        }

        const state: AuthState = authReducer(initialState, ArchiveNoteState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "Note archived",
                status: "success",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [
                {_id: "1234",
                pinned: true,
                title: "read books",
                description: "Leo Tolstoy",
                tag: "Home",
                priority: "Medium",
                selectedBackgroundColor: "red",
                createdDate: "24/08/2022",
                createdTime: "12:26",}
            ],
            archivedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",}
            ]
        })
    })


    it("should get archived notes", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [{
                _id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
              }],
              archivedNotes: []
        }

        const ArchiveNotesState: Action = {
            type: "GET_ARCHIVED_NOTES",
            payload: {
                data: [
                    {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, ArchiveNotesState)

        expect(state).toEqual({
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [
                {_id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",}
            ],
            archivedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",}
            ]
        })
    })


    it("should delete an archived note", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [{
                _id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
              }],
              archivedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
                }
              ]
        }

        const ArchiveNotesState: Action = {
            type: "DELETE_FROM_ARCHIVE",
            payload: {
                toastMessage: "archived note deleted",
                data: [
                    {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, ArchiveNotesState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "archived note deleted",
                status: "alert",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [
                {_id: "1234",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",}
            ],
            archivedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",}
            ]
        })
    })

    it("should restore an archived note", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [],
              archivedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
                }
              ]
        }

        const ArchiveNotesState: Action = {
            type: "RESTORE_FROM_ARCHIVE",
            payload: {
                toastMessage: "archived note restored",
                notesData: [],
                archivedData: [
                    {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, ArchiveNotesState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "archived note restored",
                status: "success",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [],
            archivedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",}
            ]
        })
    })

    //Trashed Notes
    it("should add a note to trashed notes", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              trashedNotes: []
        }

        const TrashedNotesState: Action = {
            type: "MOVE_TO_TRASH",
            payload: {
                data: [
                    {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, TrashedNotesState)

        expect(state).toEqual({
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              trashedNotes: [
                {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }
            ]
        })
    })


    it("should restore a note from trashed notes", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              trashedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
                }
              ]
        }

        const TrashedNotesState: Action = {
            type: "RESTORE_FROM_TRASH",
            payload: {
                toastMessage: "trashed note restored",
                notesData: [],
                trashData: [
                    {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, TrashedNotesState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "trashed note restored",
                status: "success",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              notes: [],
              trashedNotes: [
                {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }
            ]
        })
    })

    it("should delete a note from trashed notes", () => {
        const initialState = {
            toastData: {
                display: false,
                data: "",
                status: "",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              trashedNotes: [
                {_id: "1235",
                pinned: true,
                title: "read books",
                description: "Harry Potter",
                tag: "Home",
                priority: "Low",
                selectedBackgroundColor: "blue",
                createdDate: "26/08/2022",
                createdTime: "12:26",
            },
              ]
        }

        const TrashedNotesState: Action = {
            type: "DELETE_FROM_TRASH",
            payload: {
                toastMessage: "note deleted from trash",
                data: [
                    {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }],
            }
        }

        const state: AuthState = authReducer(initialState, TrashedNotesState)

        expect(state).toEqual({
            toastData: {
                display: true,
                data: "note deleted from trash",
                status: "alert",
              },
              signedIn: true,
              userName: "Balaji",
              userEmail: "balaji@gmail.com",
              userID: "1234",
              trashedNotes: [
                {_id: "1235",
                    pinned: true,
                    title: "read books",
                    description: "Harry Potter",
                    tag: "Home",
                    priority: "Low",
                    selectedBackgroundColor: "blue",
                    createdDate: "26/08/2022",
                    createdTime: "12:26",
                }
            ]
        })
    })

})