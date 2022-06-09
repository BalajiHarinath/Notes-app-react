import "../../css/main.css";
import "./inputcard.css";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
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
  const [body, setBody] = useState("");

  console.log(inputCardDetails.description);

  const updateInputCardDetails = () => {
    setInputCardDetails({ ...inputCardDetails, description: body });
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

          <ColorPalette
            setInputCardDetails={setInputCardDetails}
            inputCardDetails={inputCardDetails}
            edit={edit}
          />
        </div>

        <button
          className={`${
            inputCardDetails.title === "" ||
            inputCardDetails.description === "<p><br></p>" ||
            inputCardDetails.description === ""
              ? "btn-disable-create-note"
              : ""
          } btn-add-new-note btn-solid btn-small flex flex-justify-center flex-align-center text-base`}
          disabled={
            inputCardDetails.title === "" ||
            inputCardDetails.description === "<p><br></p>" ||
            inputCardDetails.description === ""
          }
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
      </div>
    </div>
  );
};
