import React, { useState, useEffect } from "react";
import AddCSVFiles from "./AddCSVFiles";
import Match from "./Match";
import Submit from "./SubmitInvoice";

function Invoices(props) {
  const [csvInvoiceData, setCSVInvoiceData] = useState([]);
  const [csvLineItemsData, setCSVLineItemsData] = useState([]);
  const [matchingPattern, setMatchingPattern] = useState(null);

  useEffect(() => {
    var loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      props.history.push("/");
    } else {
      const supplierMatchingPattern = localStorage.getItem(
        `${loggedInUser}_matchingPattern`
      );
      setMatchingPattern(JSON.parse(supplierMatchingPattern));
    }
  }, [props]);

  // Handle CSV Invoice
  const handleInputInvoice = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result.split("\n").map((line) => {
        return line.split(",");
      });
      if (lines.length > 2 || lines[0].length !== lines[1].length) {
        alert(
          "the CSV file has more than 1 invoice or some fields are empty, please try again after fixing the error"
        );
        return;
      }
      setCSVInvoiceData(lines);
    };
    reader.readAsText(e.target.files[0]);
  };

  // Handle CSV LineItems
  const handleInputLineItems = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const lineItems = reader.result.split("\n").map((line) => {
        return line.split(",");
      });
      const singleLineItemLength = lineItems[0].length;
      lineItems.forEach((lineItem) => {
        if (singleLineItemLength !== lineItem.length) {
          alert(
            "some fields are empty, please try again after fixing the error"
          );
          return;
        }
      });
      setCSVLineItemsData(lineItems);
    };
    reader.readAsText(e.target.files[0]);
  };

  // handle MatchingPattern
  const handleMatchingPattern = async (obj) => {
    var loggedInUser = await localStorage.getItem("loggedInUser");
    localStorage.setItem(
      `${loggedInUser}_matchingPattern`,
      JSON.stringify(obj)
    );
    setMatchingPattern(obj);
  };

  const handleCancel = () => {
    setCSVInvoiceData([]);
    setCSVLineItemsData([]);
  };

  // what to render
  const renderComponent = () => {
    if (csvLineItemsData.length > 0 && csvInvoiceData.length > 0) {
      if (!matchingPattern) {
        return (
          <Match
            csvInvoiceData={csvInvoiceData}
            csvLineItemsData={csvLineItemsData}
            handleMatchingPattern={handleMatchingPattern}
          />
        );
      } else {
        return (
          <Submit
            matchingPattern={matchingPattern}
            setMatchingPattern={setMatchingPattern}
            handleCancel={handleCancel}
            csvLineItemsData={csvLineItemsData}
            setCSVInvoiceData={setCSVInvoiceData}
          />
        );
      }
    } else {
      return (
        <AddCSVFiles
          handleInputInvoice={handleInputInvoice}
          handleInputLineItems={handleInputLineItems}
        />
      );
    }
  };

  return <div>{renderComponent()}</div>;
}

export default Invoices;
