import "../../css/main.css";
import "./labelPage.css";
import { useEffect, useState } from "react";
import { Sidebar, LabelCard } from "../../Components";
import { useNotes, useAuth } from "../../Context";

export const LabelPage = () => {
  const { getNotes } = useNotes();
  const { authState } = useAuth();
  const { notes } = authState;

  const tags = ["all", "Home", "Work", "Personal"];
  const order = { Low: 1, Medium: 2, High: 3 };

  const [labels, setLabels] = useState({
    all: true,
    Home: false,
    Work: false,
    Personal: false,
    LowToHigh: false,
    HighToLow: false,
  });

  const [filteredNotes, setFilteredNotes] = useState([notes]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    (function () {
      let newData = [...notes];
      if (labels.LowToHigh) {
        newData.sort((a, b) => order[a.priority] - order[b.priority]);
      }
      if (labels.HighToLow) {
        newData.sort((a, b) => order[b.priority] - order[a.priority]);
        console.log(newData);
      }
      if (labels.all) {
        setFilteredNotes(newData);
      } else {
        const selectedTags = tags.filter((item) => labels[item]);
        newData = newData.filter((item) => selectedTags.includes(item.tag));
        setFilteredNotes(newData);
      }
    })();
  }, [labels]);

  return (
    <main className="label-main m-3">
      <Sidebar />
      <div>
        <div>
          <div className="spacer-1"></div>
          <h4 className="font-bold text-lg">Labels</h4>
          <div className="spacer-1"></div>

          <div className="flex flex-gap-1">
            <button
              className={`${labels.all ? "selected" : ""} btn-label font-bold`}
              onClick={() => {
                setLabels({
                  ...labels,
                  all: !labels.all,
                  Home: false,
                  Work: false,
                  Personal: false,
                });
              }}
            >
              All
            </button>
            <button
              className={`${labels.Home ? "selected" : ""} btn-label font-bold`}
              onClick={() => {
                setLabels({ ...labels, all: false, Home: !labels.Home });
              }}
            >
              Home
            </button>
            <button
              className={`${labels.Work ? "selected" : ""} btn-label font-bold`}
              onClick={() => {
                setLabels({ ...labels, all: false, Work: !labels.Work });
              }}
            >
              Work
            </button>
            <button
              className={`${
                labels.Personal ? "selected" : ""
              } btn-label font-bold`}
              onClick={() => {
                setLabels({
                  ...labels,
                  all: false,
                  Personal: !labels.Personal,
                });
              }}
            >
              Personal
            </button>
          </div>

          <div className="spacer-3"></div>

          <h4 className="font-bold text-lg">Priority</h4>
          <div className="spacer-1"></div>
          <div className="flex flex-gap-1">
            <label
              htmlFor="low-to-high"
              className="text-base font-bold flex flex-align-center flex-gap-0-5"
            >
              <input
                type="radio"
                name="priority"
                className="btn-priority"
                id="low-to-high"
                onClick={() =>
                  setLabels({ ...labels, HighToLow: false, LowToHigh: true })
                }
              />
              Low to High
            </label>
            <label
              htmlFor="high-to-low"
              className="text-base font-bold flex flex-align-center flex-gap-0-5"
            >
              <input
                type="radio"
                name="priority"
                className="btn-priority"
                id="high-to-low"
                onClick={() =>
                  setLabels({ ...labels, LowToHigh: false, HighToLow: true })
                }
              />
              High to Low
            </label>
          </div>

          <div className="spacer-3"></div>

          {filteredNotes.length !== 0 ? (
            filteredNotes.map((item) => {
              return <LabelCard item={item} key={item._id} />;
            })
          ) : (
            <div> No Notes</div>
          )}
        </div>
        <div className="spacer-2"></div>
      </div>
    </main>
  );
};
