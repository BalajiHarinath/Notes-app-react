import "../../css/main.css";
import "./displayCard.css";

type DisplayCardEmptyProps = {
  color?: string,
  text?: string
}
export const DisplayCardEmpty = ({ color, text }: DisplayCardEmptyProps) => {
  return (
    <>
      <div
        className="display-card-empty flex flex-column flex-justify-center flex-align-center pd-1"
        style={{ backgroundColor: color }}
      >
        <p>No {text} notes</p>
      </div>
      <div className="spacer-2"></div>
    </>
  );
};
