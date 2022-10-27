import React from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  return (
    <>
      <button>Login</button>
      <h4>or</h4>
      <Link to="/page">sign in without authentification</Link>
    </>
  );
}

export default AuthPage;
