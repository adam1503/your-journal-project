import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Feedback() {
  const [feedback, setFeedback] = useState(false);

  const writeFeedback = () => {
    setFeedback(!feedback);
    setTimeout(() => {
      document.getElementById("form").scrollIntoView();
    }, 200);
  };

  useEffect(() => {
    setFeedback(false);
  }, []);

  return (
    <>
      <Wrapper>
        <button
          className={`feedback ${feedback && "color"}`}
          onClick={() => writeFeedback()}
        >
          Leave feedback
        </button>
        <form
          className={`form ${feedback && "show"}`}
          action="https://formspree.io/f/mzbwjgky"
          method="post"
          id="form"
        >
          <input
            type="text"
            className="form-input"
            name="simple-contact-form"
          />
          <button type="submit" className="submit-btn">
            Send Feedback
          </button>
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .feedback {
    background: transparent;
    border: 1px solid black;
    font-size: 1.3rem;
    border-radius: 10px;
    padding: 5px;
    margin-left: 1rem;
    margin-bottom: 1.5rem;
    transition: all 0.1s linear;
    cursor: pointer;
    :hover {
      background: #dadada;
    }
    :active {
      transform: scale(1.1);
      background: rgba(243, 196, 110, 0.7);
    }
  }
  .color {
    background: rgba(243, 196, 110, 0.7);
    :hover {
      background: rgba(243, 196, 110, 0.7);
    }
  }

  .form {
    display: none;
    grid-template-columns: 65% 5rem;
    max-width: 600px;
    margin-left: 1rem;
    padding-bottom: 2rem;
    align-items: center;
    gap: 1rem;
  }
  .show {
    display: grid;
  }
  .form-input {
    height: 4rem;
    border-radius: 10px;
    border: none;
    font-size: 1.4rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    padding: 0 10px;
  }
  .submit-btn {
    font-size: 1.2rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    border-radius: 10px;
    border: 1px solid black;
    padding: 6px;
    cursor: pointer;
    :hover {
      background: #cd52fe31;
      color: white;
    }
  }
`;

export default Feedback;
