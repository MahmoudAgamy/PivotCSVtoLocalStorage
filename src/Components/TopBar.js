import React from "react";
import "../css/topBar.css";

function TopBar(props) {
  //handlers
  const handleLogOut = () => {
    localStorage.setItem("loggedInUser", "");
    props.history.push("/invoices");
  };

  return (
    <div className="TopBar">
      <div className="logo">
        <p>Pivot Inc. Supplier's Portal</p>
      </div>
      <div className="loggedInUser">
        <p>{localStorage.getItem("loggedInUser")}</p>
      </div>
      {/* if user logged in show log out otherwise show nothing */}
      {!!localStorage.getItem("loggedInUser") ? (
        <div className="logOut" onClick={() => handleLogOut()}>
          LOG OUT
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TopBar;
