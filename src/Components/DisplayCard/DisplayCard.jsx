import "../../css/main.css";
import "./displayCard.css";
import { useNotes } from "../../Context";

export const DisplayCard = ({ item, edit, setEdit }) => {
  const {
    _id,
    pinned,
    title,
    description,
    tag,
    priority,
    selectedBackgroundColor,
  } = item;
  const { archiveNote, deleteNote } = useNotes();
  return (
    <>
      <div
        className="display-card flex flex-column pd-1"
        style={{ backgroundColor: selectedBackgroundColor }}
        key={_id}
      >
        <button className="btn-transparent btn-pinned">
          <span
            className={`${pinned ? "active" : ""} material-icons btn-color`}
          >
            push_pin
          </span>
        </button>
        <div className="container-input-text pdb-1">
          <h5 className="pdb-1">{title}</h5>
          <p className="pdb-1 text-display-card text-base">{description}</p>
        </div>

        <div className="edit-section flex flex-align-center">
          <div className="flex flex-gap-2">
            <div className="tag flex flex-align-center">{tag}</div>
            <div className="priority flex flex-align-center">{priority}</div>
          </div>

          <div className="flex flex-justify-end flex-grow-1 flex-gap-2">
            <button
              className="btn-transparent"
              onClick={() => {
                archiveNote(_id, item);
              }}
            >
              <span className="material-icons-outlined btn-archive text-3xl">
                archive
              </span>
            </button>
            <button
              className="btn-transparent"
              onClick={() => {
                deleteNote(_id, item);
              }}
            >
              <span className="material-icons-outlined btn-delete text-3xl">
                delete
              </span>
            </button>

            <button
              className="btn-edit-display-card btn-solid btn-small flex flex-justify-center flex-align-center text-base"
              onClick={() => {
                setEdit({
                  ...edit,
                  isEdit: true,
                  editItem: {
                    ...edit.editItem,
                    _id: _id,
                    pinned: pinned,
                    title: title,
                    description: description,
                    tag: tag,
                    priority: priority,
                    selectedBackgroundColor: selectedBackgroundColor,
                  },
                });
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="spacer-2"></div>
    </>
  );
};
