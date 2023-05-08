import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="LandingPageWrapper">
      <h1>You want to Login or Register?</h1>
      <ul>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
      </ul>
    </div>
  );
}
