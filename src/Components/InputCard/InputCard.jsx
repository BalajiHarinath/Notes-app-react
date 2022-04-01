import "../../css/main.css";
import "./inputcard.css";
import { useState } from "react";
import { ColorPalette } from "..";
import { useNotes } from "../../Context";

export const InputCard = ({ setCreateNewCard, edit }) => {
  const [inputCardDetails, setInputCardDetails] = useState({
    pinned: false,
    title: "",
    description: "",
    tag: "Tag",
    priority: "Priority",
    selectedBackgroundColor: "#faf8f8",
  });
  const { addNote } = useNotes();
  return (
    <div
      className="container-input-new-note flex flex-column pd-1"
      style={{ backgroundColor: inputCardDetails.selectedBackgroundColor }}
    >
      <button
        className="btn-transparent btn-pinned"
        onClick={() => {
          setInputCardDetails({
            ...inputCardDetails,
            pinned: !inputCardDetails.pinned,
          });
        }}
      >
        <span
          className={`${
            inputCardDetails.pinned ? "active" : ""
          } material-icons btn-color`}
        >
          push_pin
        </span>
      </button>
      <div className="container-input-text pdb-1">
        <textarea
          type="text"
          className="title-new-note"
          placeholder="Title"
          rows="1"
          value={inputCardDetails.title}
          onChange={(e) => {
            setInputCardDetails({ ...inputCardDetails, title: e.target.value });
          }}
          autoFocus
        />
        <textarea
          type="text"
          className="text-new-note"
          placeholder="Take a note..."
          rows="2"
          value={inputCardDetails.description}
          onChange={(e) => {
            setInputCardDetails({
              ...inputCardDetails,
              description: e.target.value,
            });
          }}
        />
      </div>
      <div className="edit-section flex flex-justify-space-between">
        <select
          className="dropdown-new-note"
          value={inputCardDetails.tag}
          onChange={(e) => {
            setInputCardDetails({ ...inputCardDetails, tag: e.target.value });
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
          value={inputCardDetails.priority}
          onChange={(e) => {
            setInputCardDetails({
              ...inputCardDetails,
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
        <button
          className="btn-add-new-note btn-solid btn-small flex flex-justify-center flex-align-center text-base"
          onClick={() => {
            setCreateNewCard((prev) => !prev);
            addNote({
              ...inputCardDetails,
              tag:
                inputCardDetails.tag === "Tag" ? "Home" : inputCardDetails.tag,
              priority:
                inputCardDetails.priority === "Priority"
                  ? "Low"
                  : inputCardDetails.priority,
            });
          }}
        >
          Add
        </button>
        <div className="btn-container-edit-section flex flex-gap-1">
          <ColorPalette
            setInputCardDetails={setInputCardDetails}
            inputCardDetails={inputCardDetails}
            edit={edit}
          />
        </div>
      </div>
    </div>
  );
};
