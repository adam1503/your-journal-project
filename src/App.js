import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import WelcomePage from "./WelcomePage";
import AuthPage from "./AuthPage";
import Fusion from "./Fusion";
import AuthWrapper from "./AuthWrapper";

const App = () => {
  return (
    <>
      <AuthWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Fusion />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/photos" element={<Home />} />
            <Route path="/page" element={<Page />} />
          </Routes>
        </Router>
      </AuthWrapper>
    </>
  );
};

export default App;
