import "../../css/main.css";
import "./home.css";
import { DisplayCard, InputCard } from "../../Components";
import { Header, Footer } from "../../Components";

export const Home = () => {
    return(
        <>
        <Header />
        <main className="home-main grid-2-column m-3">
            <aside className="sidebar text-lg">
                <ul className="list-style-none flex flex-column flex-gap-1">
                    <li className="sidebar-item flex flex-align-center flex-gap-1">
                        <span className="material-icons-outlined ">home</span>
                        <span>Home</span>
                    </li>
                    <li className="sidebar-item flex flex-align-center flex-gap-1">
                        <span className="material-icons-outlined ">label</span>
                        <span>Labels</span>
                    </li>
                    <li className="sidebar-item flex flex-align-center flex-gap-1">
                    <span className="material-icons-outlined ">inventory_2</span>
                        <span>Archive</span>
                    </li>
                    <li className="sidebar-item flex flex-align-center flex-gap-1">
                        <span className="material-icons-outlined ">delete</span>
                        <span>Trash</span>
                    </li>
                    <li className="sidebar-item flex flex-align-center flex-gap-1">
                        <span className="material-icons-outlined ">account_circle</span>
                        <span>Profile</span>
                    </li>

                    <button className="btn-create-new-note btn-solid btn-medium flex flex-justify-center flex-align-center text-base">Create New Note</button>
                </ul>
            </aside>

            <div>
                <InputCard />
                <div className="spacer-3"></div>

                {/* Pinned */}
                <div>
                    <h4 className="font-bold text-lg">Pinned</h4>
                    <div className="spacer-1"></div>
                        <DisplayCard color="#fcf5d8"/>
                </div>

                <div className="spacer-2"></div>

                {/* Others */}
                <div>
                    <h4 className="font-bold text-lg">Others</h4>
                    <div className="spacer-1"></div>
                        <DisplayCard color="#eadbfa"/>
                </div>
            </div>

        </main>
        <Footer />
        </>
    )
}