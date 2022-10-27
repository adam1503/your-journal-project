import React from "react";
import styled from "styled-components";

function Alert({ msg, type, showAlert }) {
  const timeOut = setTimeout(() => {
    showAlert();
  }, 1000);
  return (
    <Wrapper>
      <div className="alert-wrapper">
        <div className="alert-container">
          <p className={`alert ${type}`}>{msg}</p>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .alert-wrapper {
    position: fixed;
    top: 1.3rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: grid;
    place-items: center;
    width: 70%;
    z-index: 100;
    /* height: 15%; */
    /* background: rgba(0, 0, 0, 0.3); */
  }
  .alert-container {
    width: 75%;
    max-width: 300px;
    height: 4rem;
    display: grid;
    align-items: center;
  }
  //types:
  .danger {
    background: #fc9595;
  }
  .success {
    background: rgb(148, 205, 161);
  }
  //end of types
  .alert {
    text-align: center;
    font-size: 25px;
    font-weight: 400;
    padding: 10px;
    border-radius: 12px;
    /* height: 3rem; */
  }
`;

export default Alert;
