import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import { useRef } from "react";
import DeleteAlert from "./DeleteAlert";
import SeeWholeText from "./SeeWholeText";
import {
  AiFillEdit,
  AiOutlineCalendar,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";

function DiaryList() {
  const {
    list,
    editItem,
    deleteItem,
    deleteAlert,
    setDeleteAlert,
    addImage,
    editID,
    deleteEditingNote,
    refContainer,
    seeText,
    setSeeText,
    seeWholeText,
  } = useGlobalContext();

  return (
    <Wrapper>
      <h2
      // style={{
      // textAlign: "center",
      // fontWeight: "500",
      // fontSize: "1.5rem",
      // marginBottom: "2rem",
      // marginTop: "1.5rem",
      // fontFamily: "Tangerine",
      // }}
      >
        Notes:
      </h2>
      <div className="section">
        {list.map((item) => {
          const {
            id,
            image,
            text,
            day,
            month,
            year,
            hour,
            minutes,
            edit,
            day1,
            month1,
            year1,
            hour1,
            minutes1,
          } = item;
          return (
            <>
              <div
                className={`container1 ${id === editID && "background"}`}
                ref={refContainer}
                id={id}
              >
                {id === editID && (
                  <div className="editing-container">
                    <AiFillEdit className="edit-icon" />
                    <h1>Editing...</h1>
                  </div>
                )}

                {id !== editID && (
                  <div className="date-info">
                    <AiOutlineCalendar className="calendar" />
                    <div className="dates">
                      {id !== editID && (
                        <>
                          <h3>
                            {day}/ {month}/ {year} {hour}:{minutes}
                          </h3>
                          {edit && (
                            <h3>
                              Edited: {day1}/ {month1}/ {year1} {hour1}:
                              {minutes1}
                            </h3>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className={`photo-text1 `}>
                  {/* <div className="editing-background"></div> */}
                  <div
                    className={`photo-container1 ${
                      id === editID && "isEditing"
                    }`}
                  >
                    {image ? (
                      <img src={image} alt="image" className="photo1" />
                    ) : (
                      <div className="add-image">
                        <h3 style={{ textAlign: "center", fontWeight: "400" }}>
                          Add image
                        </h3>
                        <Link
                          to="/photos"
                          onClick={() => addImage(id)}
                          className="plus-sign1"
                        >
                          <AiOutlinePlusCircle />
                        </Link>
                      </div>
                    )}
                  </div>

                  <div
                    className={`description1 ${id === editID && "isEditing"}`}
                  >
                    {/* <h4>
                      {text.length > 160
                        ? `${text.substring(0, 160)}... `
                        : text}
                    </h4> */}
                    <h4>{text}</h4>
                    {text.length > 160 && (
                      <button onClick={() => seeWholeText(text)}>
                        See text
                      </button>
                    )}
                  </div>
                </div>
                {id !== editID && (
                  <div className="edit-delete-btns">
                    <button onClick={() => editItem(id)} className="btn">
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => deleteEditingNote(id)}
                      className="btn"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                )}
              </div>
            </>
          );
        })}
        {deleteAlert && <DeleteAlert />}
      </div>
      {seeText && <SeeWholeText />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h2 {
    text-align: center;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    font-weight: 300;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    margin-top: 1rem;
    /* font-family: "Kaushan Script", cursive; */
    /* font-family: "Dancing Script", cursive; */
  }
  .section {
    width: 90%;
    margin: 1rem auto;
  }
  .container1 {
    width: 100%;
    max-width: 750px;
    /* display: grid; */
    /* place-items: center; */
    /* grid-template-columns: 1fr 1fr; */
    /* column-gap: 10px; */
    border: 1px solid black;
    border-radius: 10px;
    height: 23rem;
    position: relative;
    margin-bottom: 2rem;
    background: #6398634d;
  }
  .editing-container {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    /* background: linear-gradient(
      27deg,
      rgba(255, 255, 255, 1) 26%,
      rgba(238, 193, 255, 0.7) 100%
    ); */
    background: linear-gradient(
      27deg,
      rgba(255, 255, 255, 0.7716958609615722) 44%,
      rgba(99, 152, 99, 0.6344409590007878) 100%
    );

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .editing-container h1 {
    color: #000000b7;
  }
  .edit-icon {
    font-size: 5rem;
    color: #cd52fe5e;
  }
  .date-info {
    width: 70%;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    /* justify-items: center; */
    column-gap: 10px;
    margin: 7px auto;
  }
  .dates > h3 {
    font-weight: 500;
    font-size: 1.1rem;
  }
  .calendar {
    font-size: 2.5rem;
    color: #cd52fe9b;
  }
  .photo-text1 {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    margin: 1rem 1rem;
    /* height: 15rem; */
    /* grid-template-columns: 200px 200px; */
    /* grid-template-columns: auto auto; */
    column-gap: 10px;
  }

  /* .background {
    background: gray;
  } */
  //!want to have an overlay of a gray background with the text of 'Editing...' on the element which is being edited

  .photo-container1 {
    height: 15rem;
    width: 100%;
    position: relative;
  }
  .isEditing {
    display: none;
  }
  .photo-container1 > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: cover;
    border-radius: 15px;
  }
  .add-image {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .add-image > h3 {
    font-size: 1.3rem;
  }
  .plus-sign1 {
    font-size: 2rem;
    background: transparent;
    border: none;
    color: #00000074;
    position: absolute;
    width: 2rem;
    /* top: 40%; */
    left: 0;
    right: 0;
    margin: 0 auto;
    cursor: pointer;
    :hover {
      color: black;
    }
  }

  .description1 {
    /* border: 2px solid black; */
    border-radius: 15px;
    width: 100%;
    height: 15rem;
    background: #f7f2fc;
    padding: 10px 15px;
    overflow: hidden;
    position: relative;
  }
  .description1 h4 {
    font-size: 18px;
    font-weight: 400;
  }
  .description1 button {
    position: absolute;
    width: 5rem;
    background: #b3dab3;
    border-radius: 5px;
    font-size: 17px;
    left: 0;
    right: 0;
    bottom: 7px;
    margin: 0.5rem auto;
    border: none;
    padding: 5px 5px;
    cursor: pointer;
    outline: 1px solid black;
    :hover {
      background: #dfa0f8;
    }
  }
  .edit-delete-btns {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }
  .btn {
    font-size: 1.7rem;
    border: none;
    background: transparent;
    cursor: pointer;
    /* transition: all 0.1s linear; */
    :hover {
      color: #ce52fe;
    }
  }
  //!media

  @media screen and (max-width: 550px) {
    .container1 {
      width: 90%;
      margin: 0 auto 1.5rem auto;
      height: 18.5rem;
    }
    .photo-container1 {
      height: 11.5rem;
    }
    .description1 {
      height: 11.5rem;
    }
    .description1 h4 {
      font-size: 14px;
      line-height: 1rem;
    }
    .btn {
      font-size: 1.4rem;
    }
    .dates > h3 {
      font-weight: 500;
      font-size: 14px;
    }
    .calendar {
      font-size: 1.5rem;
    }
    .description1 button {
      font-size: 14px;
      /* margin: 0.5rem auto; */
      margin-top: 0.3rem;
      margin-bottom: 0;
    }
    .edit-icon {
      font-size: 3rem;
    }
    .editing-container h1 {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
  @media screen and (min-width: 600px) {
    .description1 h4 {
      font-size: 17px;
    }
  }
  @media screen and (min-width: 800px) {
    .description1 h4 {
      font-size: 19px;
    }
  }

  @media screen and (min-width: 900px) {
    .container1 {
      width: 100%;
      max-width: 800px;
    }
    .section {
      width: 95%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }
    .description1 h4 {
      font-size: 15px;
    }
  }
  @media screen and (min-width: 1200px) {
    .dates {
      display: flex;
      gap: 1.5rem;
    }
  }
  @media screen and (min-width: 1400px) {
    .container1 {
      height: 26rem;
    }
    .photo-container1 {
      height: 18rem;
    }
    .description1 {
      height: 18rem;
    }
  }
`;

export default DiaryList;
