import "../../css/main.css";
import "./labelPage.css";
import { useEffect, useState } from "react";
import { Sidebar, LabelCard, DisplayCardEmpty } from "../../Components";
import { useNotes, useAuth } from "../../Context";
import { useScrollToTop, useDocumentTitle } from "../../Utils";

export const LabelPage = () => {
  useDocumentTitle();
  useScrollToTop();

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
    LatestFirst: false,
    OldFirst: false,
  });

  const [filteredNotes, setFilteredNotes] = useState([notes]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    const getTime = (date) => {
      const d = new Date(date);
      return d.getTime();
    };

    (function () {
      let newData = [...notes];
      if (labels.LowToHigh) {
        newData.sort((a, b) => order[a.priority] - order[b.priority]);
      }
      if (labels.HighToLow) {
        newData.sort((a, b) => order[b.priority] - order[a.priority]);
      }
      if (labels.LatestFirst) {
        newData.sort((a, b) => getTime(b.createdTime) - getTime(a.createdTime));
      }
      if (labels.OldFirst) {
        newData.sort((a, b) => getTime(a.createdTime) - getTime(b.createdTime));
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
      <div className="sidebar-small-screen-label-page">
        <Sidebar />
      </div>
      <div>
        <div className="container-labels-small-screen">
          <div className="spacer-1"></div>
          <h4 className="font-bold text-lg">Labels</h4>
          <div className="spacer-1"></div>

          <div className="flex flex-gap-1 flex-justify-content flex-wrap">
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

          <div className="flex flex-gap-3">
            <div className="container-priority-small-screen">
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
                      setLabels({
                        ...labels,
                        HighToLow: false,
                        LowToHigh: true,
                      })
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
                      setLabels({
                        ...labels,
                        LowToHigh: false,
                        HighToLow: true,
                      })
                    }
                  />
                  High to Low
                </label>
              </div>
            </div>

            <div className="container-date-small-screen">
              <h4 className="font-bold text-lg">Date</h4>
              <div className="spacer-1"></div>

              <div className="flex flex-gap-1">
                <label
                  htmlFor="latest-first"
                  className="text-base font-bold flex flex-align-center flex-gap-0-5"
                >
                  <input
                    type="radio"
                    name="date"
                    className="btn-date"
                    id="latest-first"
                    onClick={() =>
                      setLabels({
                        ...labels,
                        OldFirst: false,
                        LatestFirst: true,
                      })
                    }
                  />
                  Latest first
                </label>
                <label
                  htmlFor="old-first"
                  className="text-base font-bold flex flex-align-center flex-gap-0-5"
                >
                  <input
                    type="radio"
                    name="date"
                    className="btn-date"
                    id="old-first"
                    onClick={() =>
                      setLabels({
                        ...labels,
                        LatestFirst: false,
                        OldFirst: true,
                      })
                    }
                  />
                  Old first
                </label>
              </div>
            </div>
          </div>

          <div className="spacer-3"></div>

          <div className="conatiner-label-notes">
            {filteredNotes.length !== 0 ? (
              filteredNotes.map((item) => {
                return <LabelCard item={item} key={item._id} />;
              })
            ) : (
              <DisplayCardEmpty color="#fcf5d8" />
            )}
          </div>
        </div>
        <div className="spacer-2"></div>
      </div>
    </main>
  );
};
