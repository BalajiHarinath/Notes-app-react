import { Note } from "../NoteType"

export type TrashPropsType = {
    addToTrash: (value: Note) => void,
    restoreFromTrash: (value: Note) => void,
    removeFromTrash: (value: string) => void,
}