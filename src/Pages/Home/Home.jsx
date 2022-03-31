import "../../css/main.css";
import "./home.css";
import { useState, useEffect } from "react";
import { DisplayCard, InputCard, DisplayCardEmpty, Sidebar } from "../../Components";
import { useAuth } from "../../Context";

export const Home = () => {
    const [createNewCard, setCreateNewCard] = useState(false)
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [otherNotes, setOtherNotes] = useState([])
    const { authState } = useAuth();
    const { notes } = authState;

    useEffect(() => {
        setPinnedNotes(notes.filter((item) => item.pinned)) 
        setOtherNotes(notes.filter((item) => !item.pinned))
    },[notes])

    return(
        <main className="home-main m-3">
            <div>
                <Sidebar />
                {!createNewCard && <button className="btn-create-new-note btn-solid btn-medium flex flex-justify-center flex-align-center text-base ml-3 mt-2"
                            onClick={() => {setCreateNewCard(!createNewCard)}}>
                        Create New Note
                    </button>}
            </div>
            
            <div>
                {createNewCard && 
                <>
                    <InputCard setCreateNewCard={setCreateNewCard}/>
                    <div className="spacer-3"></div>
                </>}
                

                {/* Pinned */}
                <div>
                    <h4 className="font-bold text-lg">Pinned</h4>
                    <div className="spacer-1"></div>
                    {pinnedNotes.length !== 0 ?
                        pinnedNotes.map((item) => {
                               return(
                                <DisplayCard item={item} key={item._id}/>
                               )                            
                            }) 
                        :
                        <DisplayCardEmpty color="#fcf5d8" text="pinned"/>
                    }
                </div>

                <div className="spacer-2"></div>

                {/* Others */}
                <div>
                    <h4 className="font-bold text-lg">Others</h4>
                    <div className="spacer-1"></div>
                        {otherNotes.length !==0 ?
                            otherNotes.map((item) => {
                                return(
                                    <DisplayCard item={item} key={item._id}/>
                                )
                        }) :
                        <DisplayCardEmpty color="#eadbfa" />
                    }
                        
                </div>
            </div>

        </main>
    )
}