import "../../css/main.css";
import "./archived.css";
import { useEffect } from "react";
import { useAuth, useArchive } from "../../Context";
import { ArchivedCard, Sidebar } from "../../Components";

export const Archived = () => {
  const { authState } = useAuth();
  const { archivedNotes } = authState;
  const { getArchivedNotes } = useArchive();

  useEffect(() => {
    getArchivedNotes();
  },[])

  return (
    <main className="archived-main m-3">
      <Sidebar />
      <div>
        <div>
          <h4 className="font-bold text-lg">Archived</h4>
          <div className="spacer-1"></div>
          {archivedNotes.length !== 0 ? (
            archivedNotes.map((item) => {
              return <ArchivedCard item={item} key={item._id} />;
            })
          ) : (
            <div> No Archived Notes</div>
          )}
        </div>
        <div className="spacer-2"></div>
      </div>
    </main>
  );
};
