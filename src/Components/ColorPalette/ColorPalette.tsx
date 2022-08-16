import "../../css/main.css";
import "./colorpalette.css";
import { useState } from "react";
import { Note } from "Types/NoteType";
import { EditState } from "../../Pages/Home/Home";

type ColorPaletteProps = {
  setInputCardDetails?: Function,
  inputCardDetails?: Note,
  edit?: EditState,
  editCardDetails?: Note,
  setEditCardDetails?: Function,
}

export const ColorPalette = ({
  setInputCardDetails,
  inputCardDetails,
  edit,
  editCardDetails,
  setEditCardDetails,
} : ColorPaletteProps) => {
  const colors = [
    "#FAF9F6",
    "#f28983",
    "#fbbc04",
    "#FFF475",
    "#CCFF90",
    "#A7FFEB",
    "#CBF0F8",
    "#AECBFA",
    "#D7AEFB",
    "#FDCFE8",
    "#E6C9A8",
    "#E8EAED",
  ];

  const [paletteDisplay, setPaletteDisplay] = useState<boolean>(false);
  const { isEdit } = edit;

  return (
    <div
      className="button-palette"
      onMouseEnter={() => {
        setPaletteDisplay(!paletteDisplay);
      }}
      onMouseLeave={() => {
        setPaletteDisplay(!paletteDisplay);
      }}
      style={{ color: paletteDisplay ? "var(--primary-color)" : "black" }}
    >
      <span className="material-icons-outlined">palette</span>

      <div
        className={`${
          paletteDisplay
            ? "container-palette flex flex-gap-0-5 flex-wrap flex-justify-space-around"
            : "display-none"
        }`}
      >
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              className="palette"
              style={{
                backgroundColor: color,
                border: !isEdit
                  ? inputCardDetails.selectedBackgroundColor === color
                    ? "2px solid black"
                    : "none"
                  : editCardDetails.selectedBackgroundColor === color
                  ? "2px solid black"
                  : "none",
              }}
              onClick={() => {
                !isEdit
                  ? setInputCardDetails({
                      ...inputCardDetails,
                      selectedBackgroundColor: color,
                    })
                  : setEditCardDetails({
                      ...editCardDetails,
                      selectedBackgroundColor: color,
                    });
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
