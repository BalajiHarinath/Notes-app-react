import "../../css/main.css";
import "./trashPage.css";
import { useEffect } from "react";
import { useAuth, useTrash } from "../../Context";
import { TrashCard, Sidebar, DisplayCardEmpty } from "../../Components";
import { useScrollToTop, useDocumentTitle } from "../../Utils";

export const TrashPage = () => {
    useDocumentTitle();
    useScrollToTop();
  
    const { authState } = useAuth();
    const { trashedNotes } = authState;

    return(
        <main className="trash-main m-3">
            <Sidebar />
            <div>
                <div>
                <h4 className="font-bold text-lg">Trashed Notes</h4>
                <div className="spacer-1"></div>
                {trashedNotes.length !== 0 ? (
                    trashedNotes.map((item) => {
                    return <TrashCard item={item} key={item._id} />;
                    })
                ) : (
                    <DisplayCardEmpty color="#fcf5d8" text="Trashed"/>
                )}
                </div>
                <div className="spacer-2"></div>
            </div>
        </main>
    )
}