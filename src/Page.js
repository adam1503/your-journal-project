import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import NotesPad from "./NotesPad";
import DiaryList from "./DiaryList";
import Alert from "./Alert";

function Page() {
  const {
    image,
    setShowNotesPad,
    text,
    saveNote,
    list,
    alert,
    showAlert,
    logOutWhileLoading,
    setRef,
    isEditing,
  } = useGlobalContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {alert.show && <Alert {...alert} showAlert={showAlert} />}
      <Wrapper>
        <div className="navbar">
          <h1>Your journal</h1>
          <Link to="/" onClick={() => logOutWhileLoading()} className="logout">
            Logout
          </Link>
        </div>
        <div className="section">
          <div className="container">
            {isEditing && (
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontWeight: "400",
                  border: "1px solid black",
                  borderRadius: "10px",
                  background: "#6398634d",
                }}
              >
                Editing:
              </h2>
            )}
            <div className="photo-text">
              <div className="photo-container">
                {!image ? (
                  <>
                    <h3>Choose photo:</h3>
                    <Link
                      to="/photos"
                      className="plus-sign"
                      style={{ width: "2rem" }}
                    >
                      <AiOutlinePlusCircle />
                    </Link>
                  </>
                ) : (
                  <>
                    <img src={image} alt="image" className="photo" />
                    <Link to="/photos" className="change-photo">
                      Change Photo
                    </Link>
                  </>
                )}
              </div>
              <div className="description">
                <div className="text">
                  <h3>Your thoughts:</h3>
                  <h4>{text}</h4>
                  {!text ? (
                    <button
                      onClick={() => setShowNotesPad(true)}
                      className="plus-sign"
                    >
                      <AiOutlinePlusCircle />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowNotesPad(true)}
                      className="search-sign"
                    >
                      <AiOutlineSearch />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={saveNote}
              className={`save-btn ${text && "bounce"}`}
            >
              {!isEditing ? "Save" : "Save Edit"}
            </button>
          </div>
        </div>
        {list.length > 0 && <hr></hr>}

        <NotesPad />
        {list.length > 0 && <DiaryList />}
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  /* display: grid;
  place-items: center; */
  /* background: #dadada86; */

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
    padding: 3px 8px;
    border-radius: 7px;
    cursor: pointer;
    :hover {
      background: #cd52fe5e;
      color: white;
    }
  }
  /* .section {
    width: 90%;
    margin: 2rem;
  } */
  .container {
    width: 90%;
    max-width: 700px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 15px;
    background: #f4e3c963;
  }
  .photo-text {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    /* grid-template-columns: 200px 200px; */
    /* grid-template-columns: auto auto; */
    column-gap: 10px;
  }

  .photo-container {
    height: 15rem;
    width: 100%;
    position: relative;
    border-radius: 20px;
    transition: all 0.2s linear;
    :hover img {
      opacity: 0.7;
    }
    :hover .change-photo {
      opacity: 1;
    }
  }
  .photo-container > h3 {
    font-weight: 400;
    text-align: center;
    font-size: 1.4rem;
  }
  .plus-sign {
    font-size: 2rem;
    background: transparent;
    border: none;
    color: #00000074;
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    width: 2rem;
    margin: 0 auto;
    cursor: pointer;
    :hover {
      color: #cd52fe9b;
    }
  }

  .change-photo {
    position: absolute;
    left: 0;
    right: 0;
    top: 40%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    opacity: 0;
    text-decoration: none;
    color: black;
    font-size: 1rem;
    font-weight: 500;
    background: white;
    width: 5rem;
    border-radius: 10px;
    transition: all 0.1s linear;
    :hover {
      transform: scale(1.1);
    }
  }
  .photo-container > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 18px;
    transition: all 0.1s linear;
  }
  .description {
    /* height: 100%; */
    /* height: 15rem; */
    /* width: 200px; */
    width: 100%;
    max-width: 300px;
    position: relative;
    overflow-wrap: break-word;
    overflow: hidden;
  }
  .text {
    /* border: 2px solid black; */

    background: #dadada99;
    height: 15rem;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .text > h3 {
    text-align: center;
    font-weight: 400;
    font-size: 1.4rem;
    /* color: #db89fb; */
    /* text-decoration: underline; */
    margin-bottom: 5px;
  }
  .text > h4 {
    font-size: 15px;
    font-weight: 400;
  }
  .search-sign {
    font-size: 2.5rem;
    width: 2rem;
    background: transparent;
    border: none;
    color: black;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    transition: all 0.1s linear;
    cursor: pointer;
    :hover {
      /* color: #db89fb; */
      transform: scale(1.1);
    }
  }
  .text:hover .search-sign {
    transform: scale(1.2);
  }
  .save-btn {
    display: block;
    margin: 1rem auto 0 auto;
    font-size: 17px;
    background: #dadada;
    border: none;
    padding: 3px 8px;
    border-radius: 7px;
    cursor: pointer;
    :hover {
      background: #d7a1ec5a;
    }
  }
  .bounce {
    animation: bounce 1s ease-in-out infinite;
    background: #d7a1ec5a;
    :hover {
      background: #db89fb;
    }
  }
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  /* //!media */

  @media screen and (max-width: 400px) {
    .photo-container {
      height: 12rem;
    }

    .text {
      height: 12rem;
    }

    .description {
      max-width: 140px;
    }
    .navbar h1 {
      font-size: 2rem;
    }
    .logout {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 430px) {
    .photo-container > h3 {
      font-size: 1rem;
    }
    .text > h3 {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 800px) {
    .text > h4 {
      font-size: 17px;
    }
  }
  @media screen and (min-width: 1200px) {
    .photo-container {
      height: 20rem;
    }
    .text {
      height: 20rem;
    }
    .text > h4 {
      font-size: 18px;
    }
    .search-sign {
      font-size: 2.3rem;
    }
    .plus-sign {
      font-size: 2.5rem;
    }
  }
`;

export default Page;
