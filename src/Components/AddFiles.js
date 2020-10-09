import React from "react";
import "../css/addFiles.css";

function AddFiles(props) {
  return (
    <div className="AddFiles">
      <p>Add Invoice: </p>
      <input type="file" onChange={(e) => props.handleInputInvoice(e)} />
      <p>Add Line Items: </p>
      <input type="file" onChange={(e) => props.handleInputLineItems(e)} />
    </div>
  );
}

export default AddFiles;
