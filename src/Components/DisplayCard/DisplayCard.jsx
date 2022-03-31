import "../../css/main.css";
import "./displayCard.css";
import { useNotes } from "../../Context";

export const DisplayCard = ({item}) => {
    const { _id, pinned, title, description, tag, priority, selectedBackgroundColor } = item;
    const { archiveNote, deleteNote } = useNotes();
    return(
        <>
        <div className="display-card flex flex-column pd-1" style={{backgroundColor: selectedBackgroundColor}} key={_id}>
            <button className="btn-transparent btn-pinned"><span  className={`${pinned ? "active" : ""} material-icons btn-color`}>push_pin</span></button>
            <div className="container-input-text pdb-1">
                <h5 className="pdb-1">{title}</h5>
                <p className="pdb-1 text-display-card text-base">{description}</p>
            </div>
            <div className="edit-section flex flex-justify-space-between">
                <div className="tag">{tag}</div>
                <div className="priority">{priority}</div>

                <button className="btn-edit-display-card btn-solid btn-small flex flex-justify-center flex-align-center text-base">Edit</button>
    
                <button className="btn-transparent" onClick={() => {archiveNote(_id, item)}}><span className="material-icons-outlined btn-archive">archive</span></button>
                <button className="btn-transparent" onClick={() => {deleteNote(_id)}}><span className="material-icons-outlined btn-delete">delete</span></button>
                        
            </div>
        </div>
        <div className="spacer-2"></div>
        </>
        
    )
}