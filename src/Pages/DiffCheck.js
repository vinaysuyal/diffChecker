import { Fragment, useState } from "react";
import { analyseDifferences } from "../Utils/util";
import Header from "../Component/Header";
import Spinner from "../Component/Spinner";

function DiffChecker() {
  const [outputView, setOutputView] = useState("Line");
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [differences, setDifferences] = useState([]);
  const [softWrap, setSoftWrap] = useState(true);
  const [loadingDiff, setLoadingDiff] = useState(false);

  function processTextarea(text) {
    return text.replace(/\r\n/g, "\n");
  }
  const handleShowDifference = () => {
    setLoadingDiff(true);
    setDifferences([]);
    setTimeout(() => {
      let differences = null;
      if (outputView === "Line")
        differences = analyseDifferences(
          original.split("\n"),
          modified.split("\n"),
          outputView
        );
      else differences = analyseDifferences(original, modified, outputView);
      setDifferences(differences);
      setLoadingDiff(false);
    });
  };
  const handleViewChange = (event) => {
    setDifferences([]);
    setOutputView(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="input">
        <div className="input-container-original">
          <label htmlFor="originalTextarea">Original</label>
          <textarea
            onChange={(e) => {
              setOriginal(processTextarea(e.target.value));
              setDifferences([]);
            }}
            id="originalTextarea"
          ></textarea>
        </div>
        <div className="input-container-modified">
          <label htmlFor="modifiedTextarea">Modified</label>
          <textarea
            onChange={(e) => {
              setModified(processTextarea(e.target.value));
              setDifferences([]);
            }}
            id="modifiedTextarea"
          ></textarea>
        </div>
      </div>
      <div className="controls">
        <span>
          <div style={{ padding: "2px" }}>
            <label style={{ display: "inline" }} htmlFor="view">
              Choose View:
            </label>
            <select
              onChange={handleViewChange}
              value={outputView}
              id="view"
              name="view"
            >
              <option value="Character">Character</option>
              <option value="Line">Line View</option>
            </select>
          </div>
          <button onClick={handleShowDifference}>Show Difference(s)</button>
        </span>
      </div>
      {loadingDiff && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      {differences.length > 0 && (
        <>
          <div className="legend">
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#FFD2D2" }}
              >
                {""}
              </span>
              <span>Removed</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#D2FFD2" }}
              ></span>
              <span>Insertion</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#FFFFFF" }}
              ></span>
              <span>Common</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#FFD2D2" }}
              >
                {"⏎"}
              </span>
              <span>Removed New Line</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#D2FFD2" }}
              >
                {"⏎"}
              </span>
              <span>Inserted New Line</span>
            </div>
          </div>
          <div className="output">
            <button
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                setSoftWrap((prev) => !prev);
              }}
              className={`output__wrap-toggle ${
                softWrap
                  ? "output__wrap-toggle__on"
                  : "output__wrap-toggle__off"
              }`}
            >
              {"Wrap "}
              <svg
                version="1.1"
                id="ios7_x5F_arrows_1_"
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                viewBox="0 0 128 128"
                style={{
                  enableBackground: "new 0 0 128 128",
                  height: "16px",
                  paddingLeft: "5px",
                }}
                xmlSpace="preserve"
              >
                <style>
                  {`
          .st0 { display: none; }
          .st1 { display: inline; }
        `}
                </style>
                <g id="_x32_8_1_">
                  <path
                    d="M78.1 0v6.2c22.4 0 40.5 18.2 40.5 40.6s-18.1 40.6-40.5 40.6H17.9l27.9-28-4.5-4.5L5.5 90.8l36 36.2 4.5-4.5-28.8-28.9h60.9c25.8 0 46.7-21 46.7-46.8S103.9 0 78.1 0z"
                    id="icon_13_"
                  />
                </g>
              </svg>
            </button>
            <div style={{ whiteSpace: softWrap ? "pre-wrap" : "pre" }}>
              {differences.map((obj, index) => {
                let val = obj.value;
                if (obj.type !== "common")
                  val = val.replace(
                    "\n",
                    obj.type === "added" ? " ⏎ \n" : " ⏎ "
                  );
                return (
                  <Fragment key={index}>
                    <span
                      style={{
                        backgroundColor:
                          obj.type === "added"
                            ? "#D2FFD2"
                            : obj.type === "removed"
                            ? "#FFD2D2"
                            : "none",
                      }}
                    >
                      {val}
                    </span>
                    {outputView === "Line" && <br />}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </>
      )}
      <div className="footer"></div>
    </>
  );
}
//

export default DiffChecker;
