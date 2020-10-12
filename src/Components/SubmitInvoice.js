import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../css/submit.css";

function SubmitInvoice(props) {
  const [lineItems, setLineItems] = useState([]);

  //helper
  const buildPivotInvoice = () => {
    const mappedIndexes = {};
    const invoiceColumnNames = [
      "descriptions",
      "SKU_number",
      "quantity",
      "price",
      "rebate",
    ];
    invoiceColumnNames.forEach((icn, i) => {
      mappedIndexes[
        props.csvLineItemsData[0].indexOf(props.matchingPattern[icn])
      ] = icn;
    });
    const pivotLineItems = props.csvLineItemsData.slice(1).map((item, i) => {
      return item.reduce((acc, value, index) => {
        acc[mappedIndexes[index]] = value;
        return acc;
      }, {});
    });
    return pivotLineItems;
  };

  useEffect(() => {
    setLineItems(buildPivotInvoice);
  }, [props]);

  // Handlers
  const handleSubmit = async () => {
    var loggedInUser = await localStorage.getItem("loggedInUser");
    localStorage.setItem(
      `${loggedInUser}_LineItems`,
      JSON.stringify(lineItems)
    );
    props.setCSVInvoiceData([]);
    props.csvLineItemsData([]);
    return <Redirect to="/" />;
  };

  const handleRebuildMatchingPattern = async () => {
    var loggedInUser = await localStorage.getItem("loggedInUser");
    localStorage.setItem(`${loggedInUser}_matchingPattern`, null);
    props.setMatchingPattern(null);
    return <Redirect to="/" />;
  };

  return (
    <div className="SubmitInvoice">
      <div className="dataToSubmit">
        {lineItems.map((line, i) => {
          return (
            <div className="singleLineItem" key={i}>
              Line Item: {i + 1}
              <hr />
              {Object.keys(line).map((key, i) => {
                return <div key={i}>{`${key}: ${line[key]}`}</div>;
              })}
            </div>
          );
        })}
      </div>
      <div className="dataToSubmitButtons">
        <button onClick={() => handleSubmit().catch((err) => console.log)}>
          Submit
        </button>
        <button onClick={() => handleRebuildMatchingPattern()}>
          Rebuild match pattern
        </button>
        <button onClick={() => props.handleCancel()}>Cancel</button>
      </div>
    </div>
  );
}

export default SubmitInvoice;
