import React, { useState } from "react";
import Header from "../Header/Header";
import { useParams, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  let navigate = useNavigate()
  const [aside, setAside] = useState(false);
  let {userId} = useParams()
  if (!userId) {
    navigate("/")
  }

  return (
    <>
      <Header userId={userId} setAside={setAside} />
      <div
        className="child"
        style={{
          paddingTop: "100px",
          transition: "0.5s",
          marginRight: aside ? "250px" : "0px",
        }}
      >
        {children}
      </div>
    </>
  );
};
export default Layout;
