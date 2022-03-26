import "../../css/main.css";
import "./displaycard.css";

export const DisplayCard = ({color}) => {
    return(
        <>
        <div className="display-card flex flex-column pd-1" style={{backgroundColor: color}}>
            <button className="btn-transparent btn-pinned"><span class="material-icons btn-color">push_pin</span></button>
            <div className="container-input-text pdb-1">
                <h5 className="pdb-1">Title 1</h5>
                <p className="pdb-1 text-display-card text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
            <div className="edit-section flex flex-justify-space-between">
                <select className="dropdown-new-note">
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>
                <button className="btn-edit-display-card btn-solid btn-small flex flex-justify-center flex-align-center text-base">Edit</button>
                <div className="btn-container-edit-section flex flex-gap-1">
                    <button className="btn-transparent"><span class="material-icons-outlined btn-color">palette</span></button>
                    <button className="btn-transparent"><span class="material-icons-outlined btn-color">archive</span></button>
                    <button className="btn-transparent"><span class="material-icons-outlined btn-color">delete</span></button>
                </div>                       
            </div>
        </div>
        <div className="spacer-2"></div>
        </>
        
    )
}