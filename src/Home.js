import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import Photo from "./Photo";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import buttonsName from "./buttonsName";

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const clientID = "?client_id=rauuo6KuE0deYYNy1hZ7UN8KOOLUVV91cCGAzjgDKHE";

//!i had to let all the functionalities here, because i dont know how to manage the scroll event.
//!if i move it to the global context, it works on all of the pages.

const Home = () => {
  //   const {
  //     handleSubmit,
  //     submitOther,
  //     other,
  //     setOther,
  //     photos,
  //     loading,
  //     query,
  //     setPage,
  //   } = useGlobalContext();
  //   const { setPhotos } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [other, setOther] = useState("");
  const [activeClass, setActiveClass] = useState("");
  console.log(query === activeClass);
  const handleSubmit = (e) => {
    setQuery(e.target.innerText);
    setPage(1);
    fetchImages();
    setActiveClass(e.target.innerText);
    //! "setTimeout" in order to give time to fetch the data
    setTimeout(() => {
      document.getElementById("photos").scrollIntoView();
    }, 500);
  };

  const submitOther = (e) => {
    e.preventDefault();

    if (other) {
      setTimeout(() => {
        document.getElementById("photos").scrollIntoView();
      }, 400);
      setQuery(other);
      setOther("");
    } else {
      setOther("");
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    // if (query) {
    url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    // console.log("url", url);
    // } else {
    // url = `${mainUrl}${clientID}${urlPage}`;
    // }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else {
          return [...oldPhotos, ...data.results];
        }
        // else {
        //   return [...oldPhotos, ...data];
        // }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page, query]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <>
      <Wrapper>
        <div className="section">
          <div className="wrapper">
            <div className="header">
              <h2>How are you feeling?</h2>
              <div className="underline"></div>
              <Link to="/page" className="link">
                <BsFillArrowRightCircleFill />
              </Link>
            </div>
            <div className="emotional-wrapper">
              <div className="emotional-states">
                {buttonsName.map(({ id, name }) => {
                  return (
                    <button
                      key={id}
                      onClick={(e) => handleSubmit(e)}
                      className="emotional-btn"
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
              <form>
                <input
                  type="text"
                  placeholder="Other..."
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
                <button type="submit" onClick={submitOther}>
                  <AiOutlineSearch />
                </button>
              </form>
            </div>
          </div>
          {query && (
            <div className="photos" id="photos">
              <div className="photos-center">
                {photos.map((image, index) => {
                  return (
                    <>
                      <div>
                        <Photo key={index} {...image} />
                      </div>
                    </>
                  );
                })}
                {/* <Photo /> */}
              </div>
              {loading && <h2 className="loading">Loading...</h2>}
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .section {
    /* width: 95%; */
    min-height: 100vh;
    margin: 0 auto;
    background: #fdf7ffc0;
  }

  .wrapper {
    display: grid;
    height: 100vh;
    width: 100%;
    grid-template-rows: auto 1fr;
  }
  .emotional-wrapper {
    max-width: 530px;
    width: 80%;
    height: 80%;
    margin: 0 auto;
  }
  h2 {
    font-size: 2.4rem;
    font-family: "Fira Sans Extra Condensed", sans-serif;
    padding-top: 1rem;
    margin-bottom: 5px;
    text-align: center;
    font-weight: 600;
  }
  .underline {
    width: 10rem;
    margin: 0 auto;
    height: 5px;
    background: #f3c46ebd;
    border-radius: 5px;
    margin-bottom: 2rem;
  }
  .link {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    font-size: 2.5rem;
    color: gray;

    :hover {
      color: #f3c46ebd;
    }
  }
  .emotional-states {
    display: grid;
    height: 100%;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.6rem;
    row-gap: 0.5rem;

    margin-bottom: 0.8rem;
  }

  .emotional-btn {
    text-transform: capitalize;
    max-width: 15rem;
    height: 100%;
    /* font-weight: 600; */
    font-size: 1.3rem;
    background: white;
    padding: 2px 0;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.1s linear;

    :hover {
      background: #f3c46ebd;
    }
    :active {
      transform: scale(1.1);
    }
  }
  .class {
    border: 2px solid #f3c46ebd;
  }

  form {
    width: 50%;
    margin: 0 auto;

    display: flex;
    align-items: center;
    gap: 1rem;
  }
  form > input {
    width: 12rem;
    padding: 7px;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
  }

  form > button {
    font-size: 2rem;
    background: transparent;
    border: none;
    color: black;

    transition: all 0.1s linear;
    cursor: pointer;
    :hover {
      /* color: #db89fb; */
      transform: scale(1.1);
      color: #f3c46ebd;
    }
    :active {
      transform: scale(1.3);
    }
  }
  .photos {
    width: 97%;
    margin: 1rem auto;
  }
  .photos-center {
    /* border: 1px solid black; */
    border-bottom: none;
    /* border-top-right-radius: 15px; */
    /* border-top-left-radius: 15px; */
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  /* @media screen and (min-width: 576px) {
    .photos-center {
      grid-template-columns: repeat(auto-fill, minmax(368px, 1fr));
    }
  } */
  @media screen and (max-width: 500px) {
    h2 {
      font-size: 2rem;
    }
    .emotional-states {
      row-gap: 0.5rem;
    }
    .emotional-states > button {
      font-size: 1rem;
    }

    form > button {
      font-size: 1.5rem;
    }
    form > input {
      width: 9rem;
      font-size: 1rem;
    }
    .link {
      font-size: 1.8rem;
      right: 2px;
      top: 0;
    }
    .photos-center {
      gap: 1rem;
    }
  }
  @media screen and (min-width: 500px) {
  }
  @media screen and (min-width: 1000px) {
    .photos-center {
      gap: 3rem;
    }
  }
`;

export default Home;
