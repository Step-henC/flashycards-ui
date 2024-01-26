import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/esm/Stack";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import { ButtonGroup } from "react-bootstrap";

export default function DashboardButtonLayout() {
  return (
    <Stack
      style={{ width: "100%", padding: "0 50px 0 50px" }}
      direction="horizontal"
      gap={3}
    >


      <DropdownButton
        variant="outline-dark"
        data-bs-theme="dark"
        className="p-2 ms-auto"
        title="Sort"
      >
        <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
        <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
      </DropdownButton>
      <DropdownButton 
      data-bs-theme="dark"
      title="Filter" variant="dark" className="p-2">
        <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
        <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
      </DropdownButton>
    </Stack>
  );
}
