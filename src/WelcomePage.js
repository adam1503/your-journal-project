import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import { useGlobalContext } from "./context";
import styled from "styled-components";
import { BsArrowUp } from "react-icons/bs";
import Feedback from "./Feedback";

function WelcomePage() {
  const { alert, showAlert, loginWithRedirect, logout, isAuthenticated } =
    useGlobalContext();
  const [letsStart, setLetsStart] = useState(false);

  const upToLog = () => {
    setLetsStart(true);
    window.scroll(0, 0);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Wrapper>
        <div className="navbar">
          <h1>Your journal</h1>

          <button
            className={`logout ${letsStart && "active"}`}
            onClick={loginWithRedirect}
          >
            Login
          </button>
        </div>
        {letsStart && <BsArrowUp className="arrow" />}
        <div className="description">
          <h1>
            <span>
              <i>Welcome</i>
            </span>
            <br /> to your <b style={{ color: "#f3c46ebd" }}>journal!</b>
          </h1>
          <h2>
            This journal is intended to help you better take notes about the
            experiences of your life, by providing the possibility to highlight
            your thoughts with descriptive images.
          </h2>
        </div>
        <div className="journal-steps">
          <h1>How it works</h1>
          <hr className="horizontal" />
          <div className="grids">
            <div className="step-description1">
              <div className="grid-1">
                <h1 className="btn-num">1</h1>
                <img
                  src="./welcomePhotos/pick-photo.jpg"
                  alt="photo"
                  className="photo"
                />
              </div>
              <h2 className="desc">
                Picking a photo will inspire your thoughts.
              </h2>
            </div>
            <div className="step-description2">
              <h2 className="desc">
                Filter the photos according to the way you feel.
              </h2>
              <div className="grid-2">
                <img
                  src="./welcomePhotos/pick-state.jpg"
                  alt="photo"
                  className="photo"
                />
                <h1 className="btn-num">2</h1>
              </div>
            </div>

            <div className="step-description1">
              <div className="grid-3">
                <h1 className="btn-num">3</h1>
                <img
                  src="./welcomePhotos/choose-photo.jpg"
                  alt="photo"
                  className="photo"
                />
              </div>
              <h2 className="desc">
                Choose the photo that best describes your emotional
                state/experience(s).
              </h2>
            </div>

            <div className="step-description2">
              <h2 className="desc">Write what's on your mind!</h2>
              <div className="grid-4">
                <img
                  src="./welcomePhotos/pick-thoughts.jpg"
                  alt="photo"
                  className="photo"
                />
                <h1 className="btn-num">4</h1>
              </div>
            </div>

            <div className="step-description1">
              <div className="grid-5">
                <h1 className="btn-num">5</h1>
                <img
                  src="./welcomePhotos/pick-save.jpg"
                  alt="photo"
                  className="photo"
                />
              </div>
              <h2 className="desc">
                Saving your journal entry will allow you to look back at it in
                the 'notes' list anytime!
              </h2>
            </div>
          </div>
          <button className="lets-start" onClick={() => upToLog()}>
            Let's get started
          </button>

          {/* feedback */}
          <Feedback />
        </div>
      </Wrapper>
      <Alert {...alert} showAlert={showAlert} />
    </>
  );
}
const Wrapper = styled.div`
  .navbar {
    height: 4.3rem;
    /* border: 2px solid red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    /* margin-bottom: 2rem; */
    background: #abc2a45e;
  }
  .navbar h1 {
    font-family: "Dancing Script", cursive;
    font-size: 2.7rem;
    /* font-weight: 500; */
    color: #000000c1;
  }
  .logout {
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-size: 20px;
    background: #dadada;
    border: none;
    text-decoration: none;
    border: 1px solid black;
    color: black;
    padding: 3px 12px;
    border-radius: 7px;
    cursor: pointer;
    :hover {
      background: #cd52fe5e;
      color: white;
    }
  }
  .active {
    animation: bounce 0.8s ease-in-out infinite;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
      background: #cd52fe5e;
      box-shadow: -2px 1px 30px 2px rgba(243, 196, 110, 0.7);
    }
    100% {
      transform: scale(1);
    }
  }
  .arrow {
    position: absolute;
    right: 2rem;
    font-size: 4rem;
    top: 5rem;
    color: #000000bd;
    animation: top-bottom 0.8s ease-in-out infinite;
  }

  @keyframes top-bottom {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .description {
    padding-bottom: 1.5rem;
    height: 89vh;
    background: #fff7ec63;
    display: grid;
    place-items: center;
  }
  .description h1 {
    font-size: 3rem;
    font-weight: 300;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    text-align: center;
    color: #000000ae;
    /* margin-bottom: 3rem; */
  }
  .description h1 span {
    font-size: 6rem;
    font-family: "Lobster", cursive;
    /* color: #cd52fe76; */
    /* color: #cd52fea3; */
    color: #cd52fe90;
  }
  .description h2 {
    display: grid;
    place-items: center;
    text-align: center;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-weight: 300;
    font-size: 2.5rem;
    width: 85%;
    max-width: 700px;
    background: #f3c46e21;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 10px;
  }
  .horizontal {
    height: 5px;
    width: 250px;
    background: #cd52fe90;
    margin: 0 auto;
    border-radius: 15px;
  }

  .journal-steps {
    height: 100%;
    background: #d4e2d05f;
  }
  .journal-steps h1 {
    text-align: center;
    font-size: 4.5rem;
    font-weight: 500;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    padding-top: 0.5rem;
    color: #000000bd;
  }
  .grids {
    width: 90%;
    /* max-width: 700px; */
    padding-top: 1rem;
    margin: 0 auto;
    display: grid;
    justify-content: center;
  }
  .grid-1 {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    max-width: 700px;
    margin-bottom: 3rem;
    margin-top: 1rem;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2rem;
    max-width: 700px;
    margin-bottom: 3rem;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2rem;
    max-width: 700px;

    margin-bottom: 3rem;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2rem;
    max-width: 700px;

    margin-bottom: 3rem;
  }
  .grid-5 {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2rem;
    max-width: 700px;

    margin-bottom: 3rem;
  }
  .btn-num {
    /* border: 2px solid black; */
    border-radius: 50%;
    background: #cd52fe31;
    width: 5rem;
    font-size: 5rem;
    font-weight: 200;
    font-family: "Archivo", sans-serif;
    text-align: center;
  }
  .photo {
    width: 100%;
    height: 17rem;
    display: cover;
    border-radius: 30px;
    border: 1px solid purple;
  }

  .desc {
    display: none;
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    font-family: "Fira Sans Extra Condensed", sans-serif;
  }

  .lets-start {
    display: block;
    border: 1px solid black;
    margin: 0 auto;
    font-size: 30px;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    background: #dadada;
    /* border: none; */
    padding: 5px 12px;
    margin-bottom: 3rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.1s linear;
    :hover {
      background: #dfa0f8af;
      box-shadow: -2px 1px 30px 2px rgba(243, 196, 110, 0.7);
    }
    :active {
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: 450px) {
    .photo {
      height: 13rem;
    }
  }

  @media screen and (max-width: 600px) {
    .description h1 span {
      font-weight: 300;
      font-size: 5rem;
    }
    .navbar h1 {
      font-size: 2.5rem;
    }
    .description h2 {
      font-size: 1.3rem;
    }
    .journal-steps h1 {
      font-size: 4rem;
    }
  }
  @media screen and (min-width: 600px) {
    .description {
    }
    .description h1 span {
      font-size: 9rem;
    }
    .photo {
      height: 22rem;
    }
  }
  @media screen and (min-width: 1000px) {
    .step-description1 {
      display: grid;
      grid-template-columns: 700px 1fr;
      gap: 3rem;
      width: 95%;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
      font-weight: 200;
    }
    .step-description2 {
      display: grid;
      grid-template-columns: 1fr 700px;
      gap: 3rem;
      width: 95%;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
      font-weight: 200;
    }
    .desc {
      display: flex;
    }
  }

  /* height */
  @media screen and (min-height: 600px) {
    .description h2 {
      font-size: 2rem;
    }
  }
  @media screen and (min-height: 800px) {
    .description h2 {
      font-size: 2.2rem;
    }
  }
`;

export default WelcomePage;
