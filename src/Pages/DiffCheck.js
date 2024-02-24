import { Fragment, useState } from "react";
import { analyseDifferences } from "../Utils/util";
import Header from "../Component/Header";

function DiffChecker() {
  const [outputView, setOutputView] = useState("Line");
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [differences, setDifferences] = useState([]);
  const [softWrap, setSoftWrap] = useState(true);

  function processTextarea(text) {
    return text.replace(/\r\n/g, "\n");
  }
  const handleShowDifference = () => {
    let differences = null;
    if (outputView === "Line")
      differences = analyseDifferences(
        original.split("\n"),
        modified.split("\n"),
        outputView
      );
    else differences = analyseDifferences(original, modified, outputView);
    setDifferences(differences);
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
              <span>Added</span>
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
              <span>Added New Line</span>
            </div>
          </div>
          <div className="output">
            <button
              onClick={() => {
                setSoftWrap((prev) => !prev);
              }}
              className={`output__wrap-toggle ${
                softWrap
                  ? "output__wrap-toggle__on"
                  : "output__wrap-toggle__off"
              }`}
            >
              Soft wrap
            </button>
            <div style={{ whiteSpace: softWrap ? "pre-wrap" : "pre" }}>
              {differences.map((obj, index) => {
                let val = obj.value;
                if (obj.type !== "common") val = val.replace("\n", " ⏎ \n");
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
