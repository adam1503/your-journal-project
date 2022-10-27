import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { AiOutlineClose } from "react-icons/ai";

function SeeWholeText() {
  const { setSeeText, wholeText } = useGlobalContext();

  return (
    <Wrapper>
      <div className="text-wrapper">
        <div className="text-container">
          <button className="close-btn" onClick={() => setSeeText(false)}>
            <AiOutlineClose />
          </button>
          <h3>{wholeText}</h3>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .text-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.7);
    transition: all 0.2s linear;
  }
  .text-container {
    width: 85%;
    height: 85%;
    max-width: 500px;
    position: relative;
    padding: 0.7rem 1rem 0.5rem 1.5rem;
    background: #f6f0f8;
    display: grid;
    grid-template-rows: 40px auto;
    gap: 1rem;
    overflow-y: scroll;
    border-radius: 15px;
  }
  .text-container h3 {
    font-size: 1.5rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-weight: 300;
    letter-spacing: 0.5px;
    line-height: 1.4rem;
    margin-top: 2rem;
  }

  .close-btn {
    position: absolute;
    top: 7px;
    left: 0.6rem;
    font-size: 1.8rem;
    width: 2rem;
    color: #00000082;
    background: transparent;
    border: none;
    margin-right: 0.5rem;
    cursor: pointer;
    transition: all 0.1s linear;

    &:hover {
      color: #cd52fe9b;
    }
    &:active {
      transform: scale(1.3);
    }
  }
`;

export default SeeWholeText;
