import "../../css/main.css";
import "./editCard.css";
import "../InputCard/inputcard.css";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
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
  const [body, setBody] = useState(editCardDetails.description);

  const updateInputCardDetails = () => {
    setEditCardDetails({ ...editCardDetails, description: body });
  };

  useEffect(() => {
    updateInputCardDetails();
  }, [body]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

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
          <ReactQuill
            theme="snow"
            value={body}
            onChange={setBody}
            placeholder={"Take a note..."}
            modules={modules}
            formats={formats}
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
            className={`${
              editCardDetails.title === "" ||
              editCardDetails.description === "<p><br></p>" ||
              editCardDetails.description === ""
                ? "btn-disable-edit-note"
                : ""
            } btn-add-new-note btn-solid btn-small flex flex-justify-center flex-align-center text-base`}
            disabled={
              editCardDetails.title === "" ||
              editCardDetails.description === "<p><br></p>" ||
              editCardDetails.description === ""
            }
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
