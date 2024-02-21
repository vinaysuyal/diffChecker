import { Fragment, useState } from "react";
import { analyseDifferences } from "../Utils/util";

function DiffChecker() {
  const [outputView, setOutputView] = useState("Line");
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [differences, setDifferences] = useState([]);

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
      <div className="input">
        <div className="input-container-original">
          <label htmlFor="originalTextarea">Original Text:</label>
          <textarea
            onChange={(e) => {
              setOriginal(processTextarea(e.target.value));
              setDifferences([]);
            }}
            id="originalTextarea"
            wrap
          ></textarea>
        </div>
        <div className="input-container-modified">
          <label htmlFor="modifiedTextarea">Modified Text:</label>
          <textarea
            onChange={(e) => {
              setModified(processTextarea(e.target.value));
              setDifferences([]);
            }}
            id="modifiedTextarea"
            wrap=""
          ></textarea>
        </div>
      </div>
      <span>
        <label for="view">Choose View:</label>
        <select
          onChange={handleViewChange}
          value={outputView}
          id="view"
          name="view"
        >
          <option value="Character">Character</option>
          <option value="Line">Line View</option>
        </select>
        <br />
        <button onClick={handleShowDifference}>Show Difference(s)</button>
      </span>

      {differences.length > 0 && (
        <>
          <div className="legend">
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#FFD2D2" }}
              ></span>
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
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #000" }}
              ></span>
              <span>Common</span>
            </div>
          </div>
          <div className="output">
            <div>
              {differences.map((obj) => {
                const splittedObj = obj.value.split("\n");
                return splittedObj.map((word, index) => (
                  <Fragment key={index}>
                    <span
                      style={{
                        whiteSpace: "pre",
                        backgroundColor:
                          obj.type === "added"
                            ? "#D2FFD2"
                            : obj.type === "removed"
                            ? "#FFD2D2"
                            : "none",
                      }}
                    >
                      {word}
                    </span>
                    {outputView === "Line" && <br />}
                    {outputView !== "Line" &&
                      index !== splittedObj.length - 1 && <br />}
                    {outputView !== "Line" &&
                      index === splittedObj.length - 1 &&
                      splittedObj[index].endsWith("\n") && <br />}
                  </Fragment>
                ));
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
//

export default DiffChecker;
