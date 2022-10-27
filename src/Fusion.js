import React from "react";
import WelcomePage from "./WelcomePage";
import Page from "./Page";
import { useGlobalContext } from "./context";

function Fusion() {
  const { isAuthenticated } = useGlobalContext();

  return <>{isAuthenticated ? <Page /> : <WelcomePage />}</>;
}

export default Fusion;
