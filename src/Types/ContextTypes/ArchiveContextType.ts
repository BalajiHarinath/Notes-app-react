import { Note } from "../NoteType";
import { Action } from "Types/ReducerTypes/ReducerType";

export type ArchivePropsType = {
    getArchivedNotes?: () => void,
    deleteFromArchive?: (value: string, value2: Note) => void,
    restoreFromArchive?: (value: string) => void,
}