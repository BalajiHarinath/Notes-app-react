import "../../css/main.css";
import "./inputcard.css";

export const InputCard = () => {
    return(
        <div className="container-input-new-note flex flex-column pd-1">
            <button className="btn-transparent btn-pinned"><span class="material-icons btn-color">push_pin</span></button>
            <div className="container-input-text pdb-1">
                <textarea type="text" className="title-new-note" placeholder="Title" rows="1" autoFocus/>
                <textarea type="text" className="text-new-note" placeholder="Take a note..." rows="2" />
            </div>
            <div className="edit-section flex flex-justify-space-between">
                <select className="dropdown-new-note">
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>
                <button className="btn-add-new-note btn-solid btn-small flex flex-justify-center flex-align-center text-base">Add</button>
                <div className="btn-container-edit-section flex flex-gap-1">
                    <button className="btn-transparent"><span class="material-icons-outlined btn-color">palette</span></button>
                </div>                       
            </div>
        </div>
    )
}