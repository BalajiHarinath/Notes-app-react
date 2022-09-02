import { Action } from "Types/ReducerTypes/ReducerType";
import { Note } from "../NoteType";
import { Toast } from "../ToastType";
import React from "react";

export type User = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    terms?: boolean,
    rememberMe?: boolean,
}

export type AuthState = {
    toastData: Toast,
    signedIn: boolean,
    userName: string,
    userEmail: string,
    userID: string,
    notes?: Note[],
    archivedNotes?: Note[],
    trashedNotes?: Note[],
    isError?: boolean,
    errorMessage?: string,
}
export type AuthPropsType = {
    // toastData: Toast,
    // signedIn: boolean,
    // userName: string,
    // userEmail: string,
    // userID: string,
    // notes: Note[],
    // archivedNotes: Note[],
    // trashedNotes: Note[],
    authDispatch?: React.Dispatch<Action>,
    authState?: AuthState,
    signUp?: (value: User) => void,
    login?: (value: User) => void,
    testlogin?: () => void,
    logout?: () => void,
}
