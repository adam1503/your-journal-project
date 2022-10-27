import React from "react";
import { useGlobalContext } from "./context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";

const Photo = ({ urls: { regular } }) => {
  const { setImage, setImageEditAdd } = useGlobalContext();

  return (
    <Wrapper>
      <>
        <div className="container">
          <article className="photo">
            <img src={regular} alt="photo" />
            <Link
              to="/page"
              // onClick={() => setImage(regular)}
              onClick={() => setImageEditAdd(regular)}
              className="choose-link"
            >
              <BsFillPlusCircleFill />
            </Link>
          </article>
        </div>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .photo {
    height: 17rem;
    /* position: relative; */
    /* overflow: hidden; */
    transition: all 0.2s linear;
    /* cursor: pointer; */
    border-radius: 15px;
    position: relative;
    :hover img {
      opacity: 0.7;
      box-shadow: -2px 1px 30px 2px rgba(243, 196, 110, 0.5);
    }
    :hover .choose-link {
      opacity: 1;
    }
  }
  .photo > img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
  }
  .choose-link {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 40%;
    font-size: 2.4rem;
    border: none;
    color: black;
    padding-right: 15px;
    opacity: 0;
    width: 2rem;
    cursor: pointer;
    transition: all 0.1s linear;
    :hover {
      transform: scale(1.1);
      /* color: #f3c46e; */
    }

    :active {
      color: #f3c46e;
    }
  }

  @media screen and (max-width: 500px) {
    .photo {
      height: 10rem;
    }
  }
  @media screen and (min-width: 800px) {
    .photo {
      height: 20rem;
    }
  }
  @media screen and (min-width: 1000px) {
    .photo {
      height: 25rem;
    }
  }
`;

export default Photo;
