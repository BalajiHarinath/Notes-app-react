import "../../css/main.css";
import "../DisplayCard/displayCard.css";
import { useArchive } from "../../Context";

export const ArchivedCard = ({ item }) => {
  const { _id, title, description, tag, priority, selectedBackgroundColor } =
    item;
  const { deleteFromArchive, restoreFromArchive } = useArchive();
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
        <div className="edit-section flex flex-justify-space-between">
          <div className="tag flex flex-align-center">{tag}</div>
          <div className="priority flex flex-align-center">{priority}</div>
          <button
            className="btn-transparent"
            onClick={() => {
              restoreFromArchive(_id);
            }}
          >
            <span className="material-icons-outlined btn-archive text-3xl">
              unarchive
            </span>
          </button>
          <button
            className="btn-transparent"
            onClick={() => {
              deleteFromArchive(_id);
            }}
          >
            <span className="material-icons-outlined btn-delete text-3xl">
              delete
            </span>
          </button>
        </div>
      </div>
      <div className="spacer-2"></div>
    </>
  );
};
