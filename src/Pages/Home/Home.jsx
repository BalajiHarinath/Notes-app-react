import "../../css/main.css";
import "./home.css";
import { useState, useEffect } from "react";
import {
  DisplayCard,
  InputCard,
  DisplayCardEmpty,
  Sidebar,
  EditCard,
} from "../../Components";
import { useAuth, useNotes } from "../../Context";
import { useScrollToTop, useDocumentTitle } from "../../Utils";

export const Home = () => {
  useDocumentTitle("Home");
  useScrollToTop();

  const [createNewCard, setCreateNewCard] = useState(false);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [otherNotes, setOtherNotes] = useState([]);
  const [edit, setEdit] = useState({
    isEdit: false,
    editItem: {
      _id: null,
      pinned: false,
      title: "",
      description: "",
      tag: "Tag",
      priority: "Priority",
      selectedBackgroundColor: "#faf8f8",
    },
  });
  const { authState } = useAuth();
  const { notes } = authState;
  const { getNotes } = useNotes();

  useEffect(() => {
    setPinnedNotes(notes.filter((item) => item.pinned));
    setOtherNotes(notes.filter((item) => !item.pinned));
  }, [notes]);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <main className="home-main m-3">
      <div className="sidebar-small-screen-home-page">
        <Sidebar />
        {!createNewCard && (
          <button
            className="btn-create-new-note-desktop-screen btn-solid btn-medium flex flex-justify-center flex-align-center text-base ml-3 mt-2"
            onClick={() => {
              setCreateNewCard(!createNewCard);
            }}
          >
            Create New Note
          </button>
        )}
      </div>
      <div className="btn-create-new-card-small-screen flex flex-justify-start">
        {!createNewCard && (
          <button
            className="btn-create-new-note btn-solid btn-medium flex flex-justify-center flex-align-center text-base mt-1 mb-1"
            onClick={() => {
              setCreateNewCard(!createNewCard);
            }}
          >
            Create New Note
          </button>
        )}
      </div>

      <div>
        <div className="container-input-notes">
          {createNewCard && (
            <>
              <InputCard setCreateNewCard={setCreateNewCard} edit={edit} />
              <div className="spacer-3"></div>
            </>
          )}
        </div>

        {/* Pinned */}
        <div className="conatiner-pinned-notes">
          <h4 className="font-bold text-lg">Pinned</h4>
          <div className="spacer-1"></div>
          {pinnedNotes.length !== 0 ? (
            pinnedNotes.map((item) => {
              return (
                <DisplayCard
                  item={item}
                  edit={edit}
                  setEdit={setEdit}
                  key={item._id}
                />
              );
            })
          ) : (
            <DisplayCardEmpty color="#fcf5d8" text="pinned" />
          )}
        </div>

        <div className="spacer-2"></div>

        {/* Others */}
        <div className="conatiner-other-notes">
          <h4 className="font-bold text-lg">Others</h4>
          <div className="spacer-1"></div>
          {otherNotes.length !== 0 ? (
            otherNotes.map((item) => {
              return (
                <DisplayCard
                  item={item}
                  edit={edit}
                  setEdit={setEdit}
                  key={item._id}
                />
              );
            })
          ) : (
            <DisplayCardEmpty color="#eadbfa" />
          )}
        </div>
        {edit.isEdit && <EditCard edit={edit} setEdit={setEdit} />}
      </div>
    </main>
  );
};
