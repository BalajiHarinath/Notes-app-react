import { Note } from "../NoteType"

export type NotePropsType = {
    getNotes: () => void,
    addNote: (value: Note) => void,
    deleteNote: (value1: string, value2: Note) => void,
    updateNote: (value1: string, value2: Note) => void,
    archiveNote: (value1: string, value2: Note) => void,
}