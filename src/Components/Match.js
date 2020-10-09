import React, { useState, useEffect } from "react";
import "../css/match.css";

function Match(props) {
  const [supplierColumns, setSupplierColumns] = useState([]);
  const [pivotColumns, setPivotColumns] = useState([]);
  const [chosenSupplierColumn, setChosenSupplierColumn] = useState(null);
  const [chosenPivotColumn, setChosenPivotColumn] = useState(null);
  const [buildPattern, setBuildPattern] = useState({});

  // helper, takes an array of strings, return array of objects with boolean "show"
  const stringToObj = (arr) => {
    return arr.map((str) => {
      return { column_name: str, show: true };
    });
  };
  // helper, takes string and an array of objects to change show of the elemnt with the same name to false
  const showToFalse = (name, arr) => {
    return arr.map((obj) => {
      if (obj.column_name === name) {
        return { ...obj, show: false };
      } else {
        return obj;
      }
    });
  };

  // helper
  const updateBuildPattern = (pColumnName, sColumnName) => {
    setBuildPattern({
      ...buildPattern,
      [pColumnName]: sColumnName,
    });
    var newSuppColumnsList = showToFalse(sColumnName, supplierColumns);

    var newPivoColumnsList = showToFalse(pColumnName, pivotColumns);
    setSupplierColumns(newSuppColumnsList);
    setPivotColumns(newPivoColumnsList);
    setChosenPivotColumn(null);
    setChosenSupplierColumn(null);
  };

  useEffect(() => {
    setSupplierColumns(stringToObj(props.csvLineItemsData[0]));
    setPivotColumns(
      stringToObj(["descriptions", "SKU_number", "quantity", "price", "rebate"])
    );
  }, [props]);

  // handlers
  const supColumnClickHandler = (columnName) => {
    setChosenSupplierColumn(columnName);
    if (!chosenPivotColumn) {
      return;
    }
    updateBuildPattern(chosenPivotColumn, columnName);
  };

  const pivotColumnClickHandler = (columnName) => {
    setChosenPivotColumn(columnName);
    if (!chosenSupplierColumn) {
      return;
    }
    updateBuildPattern(columnName, chosenSupplierColumn);
  };

  const deleteFromPattern = (v) => {
    console.log(`delete ${v}`);
  };

  return (
    <div className="Match">
      <div>Matching column names (One time Process)</div>
      <div className="matchingBox">
        <div className="SupplierBox">
          {supplierColumns.map((column, i) => {
            return column.show ? (
              <div
                className="SupplierBoxColumn"
                id={i}
                onClick={(e) => supColumnClickHandler(column.column_name)}
              >
                {column.column_name}
              </div>
            ) : null;
          })}
        </div>
        <div className="PivotBox">
          {pivotColumns.map((column, i) => {
            return column.show ? (
              <div
                className="PivotBoxColumn"
                id={i}
                onClick={(e) => pivotColumnClickHandler(column.column_name)}
              >
                {column.column_name}
              </div>
            ) : null;
          })}
        </div>
        <div className="MatchedPatternBox">
          {Object.keys(buildPattern).map((key, i) => {
            return (
              <div
                className="PivotBoxColumn"
                id={i}
                onClick={(e) =>
                  deleteFromPattern(`${key} <=> ${buildPattern[key]}`)
                }
              >
                {`${key} <=> ${buildPattern[key]}`}
              </div>
            );
          })}
          <button
            onClick={() =>
              props
                .handleMatchingPattern(buildPattern)
                .catch((err) => console.log)
            }
          >
            finished
          </button>
        </div>
      </div>
    </div>
  );
}

export default Match;
