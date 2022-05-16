import "../../css/main.css";
import "../DisplayCard/displayCard.css";

export const LabelCard = ({ item }) => {
  const {
    _id,
    title,
    description,
    tag,
    priority,
    selectedBackgroundColor,
    createdTime,
  } = item;
  return (
    <>
      <div
        className="display-card flex flex-column pd-1"
        style={{ backgroundColor: selectedBackgroundColor }}
        key={_id}
      >
        <div className="container-input-text pdb-1">
          <h5 className="pdb-1">{title}</h5>
          <p
            className="pdb-1 text-display-card text-base"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
        <div className="edit-section flex flex-gap-2">
          <div className="tag flex flex-align-center">{tag}</div>
          <div className="priority flex flex-align-center">{priority}</div>
          <div className="priority flex flex-align-center">{createdTime}</div>
        </div>
      </div>
      <div className="spacer-2"></div>
    </>
  );
};
