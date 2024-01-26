import { Link } from "react-router-dom";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <div>
        <h1>404 Not Found</h1>
        <Link to="/">Return Home</Link>
      </div>
    </div>
  );
}
