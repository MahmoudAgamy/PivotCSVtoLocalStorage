import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../css/submit.css";

function SubmitInvoice(props) {
  const [lineItems, setLineItems] = useState([]);
  const [totals, setTotals] = useState({});

  // helper buildPivotInvoice START
  const buildPivotInvoice = () => {
    const mappedIndexes = {};
    const invoiceColumnNames = [
      "descriptions",
      "SKU_number",
      "quantity",
      "price",
      "rebate",
    ];

    // building the mappedIndexes depending on the names saved in the matchPattern
    // {0: "SKU_number", 1: "quantity", 2: "rebate", 3: "descriptions", 4: "price", -1: "total"}
    invoiceColumnNames.forEach((icn, i) => {
      mappedIndexes[
        props.csvLineItemsData[0].indexOf(props.matchingPattern[icn])
      ] = icn;
    });

    // Pivot Inc. line items with the values from the csv
    const pivotLineItems = props.csvLineItemsData.slice(1).map((item, i) => {
      return item.reduce((acc, value, index) => {
        acc[mappedIndexes[index]] = value;
        return acc;
      }, {});
    });
    return pivotLineItems;
  }; // helper buildPivotInvoice END

  useEffect(() => {
    const addingTotal = buildPivotInvoice().map((lineItem) => {
      lineItem["total"] =
        Math.round(
          (lineItem.quantity * lineItem.price + Number.EPSILON) * 100
        ) / 100;
      return lineItem;
    });

    // totals
    const totals = {};
    totals["subtotal"] = addingTotal.reduce((acc, v) => {
      acc = acc + v.total;
      return acc;
    }, 0);
    totals["tax"] =
      Math.round((totals.subtotal * 0.1 + Number.EPSILON) * 100) / 100;
    totals["total"] =
      Math.round((totals.subtotal + totals.tax + Number.EPSILON) * 100) / 100;
    setTotals(totals);
    setLineItems(addingTotal);
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

      <div className="singleLineItem">
        <div>SUBTOTAL: {totals.subtotal}</div>
        <div>TAX[10%]: {totals.tax}</div>
        <div>TOTAL: {totals.total}</div>
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
