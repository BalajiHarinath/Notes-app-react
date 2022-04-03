import "../../css/main.css";
import "./editCard.css";
import "../InputCard/inputcard.css";
import { useState } from "react";
import { useNotes } from "../../Context";
import { ColorPalette } from "../ColorPalette/ColorPalette";

export const EditCard = ({ edit, setEdit }) => {
  const { isEdit, editItem } = edit;
  const { updateNote } = useNotes();
  const [editCardDetails, setEditCardDetails] = useState({
    _id: editItem._id,
    pinned: editItem.pinned,
    title: editItem.title,
    description: editItem.description,
    tag: editItem.tag,
    priority: editItem.priority,
    selectedBackgroundColor: editItem.selectedBackgroundColor,
  });

  return (
    <div className="modal-edit flex flex-align-center flex-justify-center">
      <div
        className="container-edit-note flex flex-column pd-1"
        style={{ backgroundColor: editCardDetails.selectedBackgroundColor }}
      >
        <div className="container-btn-pinned-edit-note">
          <button
            className="btn-transparent btn-pinned-edit-note"
            onClick={() => {
              setEditCardDetails({
                ...editCardDetails,
                pinned: !editCardDetails.pinned,
              });
            }}
          >
            <span
              className={`${
                editCardDetails.pinned ? "active" : ""
              } material-icons btn-color`}
            >
              push_pin
            </span>
          </button>
        </div>
        <div className="container-input-text pdb-1">
          <textarea
            type="text"
            className="title-new-note"
            placeholder="Title"
            rows="1"
            value={editCardDetails.title}
            onChange={(e) => {
              setEditCardDetails({ ...editCardDetails, title: e.target.value });
            }}
            autoFocus
          />
          <textarea
            type="text"
            className="text-new-note pdt-0 mt-0"
            placeholder="Take a note..."
            rows="3"
            value={editCardDetails.description}
            onChange={(e) => {
              setEditCardDetails({
                ...editCardDetails,
                description: e.target.value,
              });
            }}
          />
        </div>
        <div className="edit-section flex flex-justify-space-between">
          <div className="flex flex-align-center flex-gap-2">
            <select
              className="dropdown-new-note"
              value={editCardDetails.tag}
              onChange={(e) => {
                setEditCardDetails({ ...editCardDetails, tag: e.target.value });
              }}
            >
              <option value="Tag" hidden>
                Tag
              </option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>
            <select
              className="dropdown-new-note"
              value={editCardDetails.priority}
              onChange={(e) => {
                setEditCardDetails({
                  ...editCardDetails,
                  priority: e.target.value,
                });
              }}
            >
              <option value="Priority" hidden>
                Priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <ColorPalette
              setEditCardDetails={setEditCardDetails}
              editCardDetails={editCardDetails}
              edit={edit}
            />
          </div>
          <button
            className="btn-add-new-note btn-solid btn-small flex flex-justify-center flex-align-center text-base"
            onClick={() => {
              updateNote(edit.editItem._id, editCardDetails);
              setEdit({ ...edit, isEdit: false });
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
