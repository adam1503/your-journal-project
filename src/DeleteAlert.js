import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";

const DeleteAlert = () => {
  const { list, ID, setDeleteAlert, deleteItem } = useGlobalContext();
  const find = list.find((item) => item.id === ID);
  return (
    <Wrapper>
      <div className="alert-container">
        <div className="alert">
          <div className="question">
            <h3>
              Are you sure you want to delete the{" "}
              <b>
                {" "}
                '{find.day}/{find.month}/{find.year} {find.hour}:{find.minutes}'
              </b>{" "}
              note?
            </h3>
            <div className="answers">
              <button onClick={() => deleteItem(find.id)}>Yes</button>
              <button onClick={() => setDeleteAlert(false)}>No</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .alert-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .alert {
    position: absolute;
    top: 15%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 70%;
    max-width: 350px;
    height: 30%;
    background: #e1dfdf;
    display: grid;
    place-items: center;
    border-radius: 15px;
  }
  .question {
    width: 90%;
    height: 95%;
    display: grid;
    grid-template-rows: 60% 40%;
    justify-content: center;
    align-items: center;
  }
  .question > h3 {
    font-size: 25px;
    font-weight: 400;
    text-align: center;
  }
  .answers {
    display: flex;
    justify-content: space-around;
  }
  .answers > button {
    font-size: 1.4rem;
    border: none;
    background: transparent;
    border-radius: 10px;
    padding: 4px;
    cursor: pointer;
    :hover {
      background: #cd52fe2d;
    }
  }

  @media screen and (max-width: 490px) {
    .alert {
      max-width: 270px;
    }
    .question > h3 {
      font-size: 18px;
    }
    .answers > button {
      font-size: 1.2rem;
    }
  }
`;

export default DeleteAlert;
