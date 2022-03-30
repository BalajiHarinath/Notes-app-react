import "../../css/main.css";
import "./home.css";
import { useState } from "react";
import { DisplayCard, InputCard, DisplayCardEmpty, Header, Footer, Sidebar } from "../../Components";
import { useAuth } from "../../Context";

export const Home = () => {
    const [createNewCard, setCreateNewCard] = useState(false)
    const { authState } = useAuth();
    const { notes } = authState;

    const pinnedNotes = notes.filter((item) => item.pinned)
    const otherNotes = notes.filter((item) => !item.pinned)

    return(
        <>
        <Header />
        <main className="home-main grid-2-column m-3">
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
                        { otherNotes.length !==0 ?
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
        <Footer />
        </>
    )
}