import "../../css/main.css";
import "./colorpalette.css";
import { useState } from "react";

export const ColorPalette = () => {
    const colors = [
        "#FFFFFF",
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
        "#E8EAED"
      ];

    const [paletteDisplay, setPaletteDisplay] = useState(false);
    return(
        <div className="button-palette"
                onMouseOver={()=>{setPaletteDisplay(!paletteDisplay)}}
                onMouseOut={()=>{setPaletteDisplay(!paletteDisplay)}}>
            <span class="material-icons-outlined btn-color">palette</span>
        
            <div className={`${paletteDisplay ? "container-palette flex flex-gap-0-5 flex-wrap flex-justify-space-around" : "display-none"}`} >
                {
                    colors.map((color, index) => {
                        return(
                            <div key={index} className="palette" style={{backgroundColor: color}}></div>
                        )
                    } )
                }       
            </div>

        </div>
    )
}