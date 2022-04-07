import "../../css/main.css";
import "../DisplayCard/displayCard.css";
import { useTrash } from "../../Context";

export const TrashCard = ({ item }) => {
  const { _id, title, description, tag, priority, selectedBackgroundColor, createdDate } =
    item;
  const { restoreFromTrash, removeFromTrash } = useTrash();
  return (
    <>
      <div
        className="display-card flex flex-column pd-1"
        style={{ backgroundColor: selectedBackgroundColor }}
        key={_id}
      >
        <div className="container-input-text pdb-1">
          <h5 className="pdb-1">{title}</h5>
          <p className="pdb-1 text-display-card text-base">{description}</p>
        </div>

        <div className="edit-section flex flex-align-center">
          <div className="flex flex-gap-2">
            <div className="tag flex flex-align-center">{tag}</div>
            <div className="priority flex flex-align-center">{priority}</div>
            <div className="priority flex flex-align-center">{createdDate}</div>
          </div>

          <div className="flex flex-justify-end flex-grow-1 flex-gap-2">
            <button
              className="btn-transparent"
              onClick={() => {
                restoreFromTrash(item);
              }}
            >
              <span className="material-icons-outlined btn-archive text-4xl">
                restore_from_trash
              </span>
            </button>
            <button
              className="btn-transparent"
              onClick={() => {
                removeFromTrash(_id);
              }}
            >
              <span className="material-icons-outlined btn-delete text-4xl">
                delete_forever
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="spacer-2"></div>
    </>
  );
};
