import "../../css/main.css";
import "./archived.css";
import { useEffect } from "react";
import { useAuth, useArchive } from "../../Context";
import { ArchivedCard, Sidebar, DisplayCardEmpty } from "../../Components";
import { useScrollToTop, useDocumentTitle } from "../../Utils";

export const Archived = () => {
  useDocumentTitle("Archived");
  useScrollToTop();

  const { authState } = useAuth();
  const { archivedNotes } = authState;
  const { getArchivedNotes } = useArchive();

  useEffect(() => {
    getArchivedNotes();
  }, []);

  return (
    <main className="archived-main m-3">
      <div className="sidebar-small-screen-archive-page">
        <Sidebar />
      </div>

      <div>
        <div className="conatiner-archived-notes">
          <h4 className="font-bold text-lg">Archived</h4>
          <div className="spacer-1"></div>
          {archivedNotes.length !== 0 ? (
            archivedNotes.map((item) => {
              return <ArchivedCard item={item} key={item._id} />;
            })
          ) : (
            <DisplayCardEmpty color="#fcf5d8" text="Archived" />
          )}
        </div>
        <div className="spacer-2"></div>
      </div>
    </main>
  );
};
