import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import linksData from "./linksData";
import { AiOutlineClose } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { MdMusicNote, MdDone } from "react-icons/md";

const NotesPad = () => {
  const { query, setQuery, handleSubmit, showNotesPad, setShowNotesPad } =
    useGlobalContext();

  const [showLinks, setShowLinks] = useState(false);
  const [link, setLink] = useState("");
  const [isSubLinkOpen, setIsSubLinkOpen] = useState(false);
  const [center, setCenter] = useState([]);
  const [bottom, setBottom] = useState([]);
  const container = useRef(null);

  const displayMusic = (e) => {
    const id = e.target.id;
    const position = e.target.getBoundingClientRect();
    const center = (position.left + position.right) / 2;
    const bottom = position.bottom + 10;
    const link = linksData.find((link) => link.id === id);
    setLink(link);
    setCenter(center);
    setBottom(bottom);
    setIsSubLinkOpen(true);
  };

  const closeSubLink = (e) => {
    if (!e.target.classList.contains("btn")) {
      setIsSubLinkOpen(false);
    }
  };

  useEffect(() => {
    const sublink = container.current;
    sublink.style.left = `${center}px`;
    sublink.style.top = `${bottom}px`;
  }, [center]);

  const { text, youtube } = link;

  return (
    <>
      <Wrapper>
        <div
          className={`notes-wrapper ${showNotesPad && "show"}`}
          onMouseOver={closeSubLink}
        >
          <div className="notes">
            <div className="header-container">
              <div className="music">
                <button onClick={() => setShowLinks(!showLinks)}>
                  <MdMusicNote />
                </button>
                {showLinks && (
                  <div className="btns-container">
                    <a
                      href="https://www.youtube.com/watch?v=Jjq6e1LJHxw&ab_channel=EnnioMorriconeVEVO"
                      target="_blank"
                      className="btn"
                      id="1"
                      onMouseOver={displayMusic}
                    ></a>
                    <a
                      href="https://www.youtube.com/watch?v=fVPB7aQHRUU&ab_channel=PauloL"
                      target="_blank"
                      className="btn"
                      id="2"
                      onMouseOver={displayMusic}
                    ></a>
                    <a
                      href="https://www.youtube.com/watch?v=CH3XhtHdsj4&t=141s&ab_channel=TOKYOGROOVEJYOSHI"
                      target="_blank"
                      className="btn"
                      id="3"
                      onMouseOver={displayMusic}
                    ></a>
                    <a
                      href="https://youtu.be/E95STK2tnoM"
                      target="_blank"
                      className="btn"
                      id="4"
                      onMouseOver={displayMusic}
                    ></a>
                    <a
                      href="https://www.youtube.com/watch?v=_ioc6sdgugo&list=LL&index=3&t=1519s&ab_channel=BrilliantClassics"
                      target="_blank"
                      className="btn"
                      id="5"
                      onMouseOver={displayMusic}
                    ></a>
                    <a
                      href="https://www.youtube.com/watch?v=tJ6fyxjF-tU&t=490s"
                      target="_blank"
                      className="btn"
                      id="6"
                      onMouseOver={displayMusic}
                    ></a>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowNotesPad(false)}
                className="close-btn"
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="form-container">
              <form className="form">
                <textarea
                  placeholder="Write here..."
                  className="text-area"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></textarea>
                <button type="submit" onClick={handleSubmit}>
                  <MdDone />
                </button>
              </form>
            </div>
          </div>
        </div>
        <aside
          className={`${isSubLinkOpen ? "sublink show" : "sublink"}`}
          ref={container}
        >
          <article>
            <h3>{text}</h3>
          </article>
        </aside>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .notes-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    transition: all 0.2s linear;
    z-index: 2;
  }
  .show {
    visibility: visible;
  }

  .notes {
    width: 85%;
    max-width: 330px;
    height: 85%;
    display: grid;
    /* place-items: center; */
    grid-template-rows: 40px auto;
    background: #ddf3dd;
    border-radius: 15px;
    box-shadow: 0 5px 35px rgba(0, 0, 0, 0.7);
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .close-btn {
    /* height: 2rem;
    width: 2rem; */
    font-size: 1.3rem;
    align-self: center;
    justify-self: right;
    margin-right: 15px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #6c6c6c;

    :hover {
      color: black;
    }
  }
  /* .close-btn > svg {
    height: 2rem;
    width: 2rem;
  } */
  .music {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
  }
  .music > button {
    font-size: 2.3rem;
    color: #00000082;
    background: transparent;
    border: none;
    margin-right: 0.5rem;
    cursor: pointer;
    transition: all 0.1s linear;

    &:hover {
      color: #cd52fe9b;
      transform: scale(1.1);
    }
    &:active {
      transform: scale(1.4);
    }
  }

  .btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
  }
  .btn {
    width: 0.8rem;
    height: 0.8rem;
    margin: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    background: #cd52fe5e;
    transition: all 0.1s linear;
    :hover {
      transform: scale(1.1);
      background: #cd52fe9b;
    }
  }

  .form-container {
    margin: 1rem;
    width: 95%;
    justify-self: center;
    /* border: 2px solid black; */
    border-radius: 15px;
    display: grid;
    place-items: center;
  }
  .form {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 90% 35px;
    row-gap: 0.6rem;
    box-sizing: border-box;
  }

  .form > button {
    /* width: 50%; */
    justify-self: center;
    align-self: center;
    font-size: 1.3rem;
    margin-bottom: 15px;
    background: transparent;
    color: #00000082;
    border: 1.5px solid #00000082;
    padding: 3px 4px 0 4px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.1s linear;
    :hover {
      background: #cd52fe5e;
      color: #000000ae;
      transform: scale(1.05);
    }
  }
  .text-area {
    /* height: 380px; */
    font-weight: 400;
    resize: none;
    overflow-y: scroll;
    border: none;
    font-size: 1.3rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    line-height: 1.2rem;
    padding: 10px;
    border: 2px solid #00000082;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  //sublink
  .sublink {
    background: #f7ecfb;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 4rem;
    left: 50%;
    width: 50%;
    max-width: 200px;
    transform: translateX(-50%);
    z-index: 5;
    display: none;
    padding: 8px 0;
    border-radius: 15px;
    transition: all 0.2s linear;
  }
  .sublink.show {
    display: block;
  }
  .sublink::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #f7ecfb;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  article h3 {
    font-weight: 600;
    font-size: 14px;
    font-family: "Fira Sans Extra Condensed", sans-serif;
  }

  @media screen and (max-width: 400px) {
    .text-area {
      font-size: 14px;
    }
    .btn {
      width: 0.8rem;
      height: 0.8rem;
      margin: 0.5rem;
    }
  }
  @media screen and (min-width: 500px) {
    .btn {
      margin: 0.7rem;
    }
    .sublink {
      padding: 15px 5px;
    }
  }
  @media screen and (min-width: 800px) {
    .notes {
      max-width: 500px;
      grid-template-rows: 50px auto;
    }
    .btn {
      width: 1.2rem;
      height: 1.2rem;
      margin: 1.3rem;
    }
    .close-btn {
      font-size: 1.8rem;
    }
    .music > button {
      font-size: 2.3rem;
    }
    .form > button {
      font-size: 2rem;
      margin-top: 18px;
    }
    article h3 {
      font-size: 22px;
    }
  }
  @media screen and (min-width: 900px) {
    .notes {
      max-width: 550px;
    }
  }
  @media screen and (min-width: 1200px) {
    .notes {
      height: 90%;
      max-width: 700px;
    }
    .btn {
      width: 1.3rem;
      height: 1.3rem;
      margin: 2rem;
    }
  }
`;

export default NotesPad;
