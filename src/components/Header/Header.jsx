import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import flashlogocards from "./flashlogocards.svg";
import React, {useState} from "react";
import "./style.css";

export default function Header({ setAside, userId }) {
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    setAside(true);
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    setAside(false);
  };


  return (
    <Navbar
      data-bs-theme="light"
      fixed="top"
      expand="lg"
      className="bg-body-tertiary mb-3"
    >
      <Container fluid>
        <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>
          <img
            alt="logo"
            width="50"
            height="50"
            src={flashlogocards}
            className="d-inline-block align top"
          />{" "}
          Flashy Cards
        </Navbar.Brand>
        <div id="full-length">
          <div id="mySidenav" className="sidenav">
            <a href="#/" className="closebtn" onClick={() => closeNav()}>
              &times;
            </a>
            <a href="/">Home</a>
            <a href={`/${userId}/flashboard`}>Dashboard</a>
            <a href={`/${userId}/newdeck/${1}`}>New Deck</a>
            <a href={`/${userId}/comments`}>Comments</a>
            <a href={`/${userId}/logout`}>Log Out</a>
          </div>
          <div id="main">
            <span
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={() => openNav()}
            >
              &#9776;
            </span>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
