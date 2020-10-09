import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../css/submit.css";

function SubmitInvoice(props) {
  const [lineItems, setLineItems] = useState([]);
  // turn matchingPattern into key: index
  // loop over matchingPattern keys and set it
  useEffect(() => {
    setLineItems(buildPivotInvoice);
  }, [props]);

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
  // Handlers
  const handleSubmit = async () => {
    var loggedInUser = await localStorage.getItem("loggedInUser");
    localStorage.setItem(
      `${loggedInUser}_LineItems`,
      JSON.stringify(lineItems)
    );
  };

  const handleRebuildMatchingPattern = () => {};

  return (
    <div className="SubmitInvoice">
      {console.log("Invvvvvvvv: ", lineItems)}
      <div className="dataToSubmit">
        {lineItems.map((line, i) => {
          return Object.keys(line).map((key, i) => {
            return <div>{`${key}: ${line[key]}`}</div>;
          });
        })}
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
