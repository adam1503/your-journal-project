import React, { useContext, useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [image, setImage] = useState("");
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [showNotesPad, setShowNotesPad] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [imageEdit, setImageEdit] = useState(false);
  const [imageEditID, setImageEditID] = useState(null);
  const [ellipsis, setEllipsis] = useState(true);
  //todo need this one for the DeleteAlert
  const [ID, setID] = useState(null);

  //todo for the SeeWholeText
  const [seeText, setSeeText] = useState(false);
  const [wholeText, setWholeText] = useState("");

  const seeWholeText = (text) => {
    setSeeText(true);
    setWholeText(text);
  };

  //todo END for the SeeWholeText

  const refContainer = useRef(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const addImage = (id) => {
    setImageEdit(true);
    setImageEditID(id);
  };

  const setImageEditAdd = (photo) => {
    if (imageEdit) {
      setList(
        list.map((item) => {
          if (item.id === imageEditID) {
            return {
              ...item,
              image: photo,
            };
          }
          return item;
        })
      );
      setImageEdit(false);
    } else {
      setImage(photo);
    }
  };

  const dayInfo = new Date().getDate();
  const monthInfo = new Date().getMonth();
  const yearInfo = new Date().getFullYear();
  const hoursInfo = new Date().getHours();
  const minutesInfo = new Date().getMinutes();

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(query);
    setShowNotesPad(false);
  };

  //!ive done it!! to write notes about that. it was much simpler than i thought.
  const saveNote = () => {
    if (isEditing) {
      document.getElementById(editID).scrollIntoView();
      // console.log(
      //   document.getElementById(editID).getBoundingClientRect().bottom
      // );
      // const bottom = document
      //   .getElementById(editID)
      //   .getBoundingClientRect().bottom;
      // window.scrollTo(0, bottom);
      setList(
        list.map((item) => {
          if (item.id === editID) {
            if (item.text === text && item.image === image) {
              return item;
            } else {
              showAlert(true, "Note edited", "success");
              return {
                ...item,
                text: text,
                image: image,
                edit: true,
                day1: dayInfo,
                month1: monthInfo,
                year1: yearInfo,
                hour1: hoursInfo,
                minutes1: minutesInfo,
              };
            }
          }
          return item;
        })
      );

      setImage("");
      setText("");
      setQuery("");
      setIsEditing(false);
      setEditID(null);
    } else if (!text) {
      showAlert(true, "Nothing written", "danger");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        image: image,
        text: text,
        day: dayInfo,
        month: monthInfo,
        year: yearInfo,
        hour: hoursInfo,
        minutes: minutesInfo,
      };
      setList([newItem, ...list]);
      showAlert(true, "Note saved", "success");
      setImage("");
      setText("");
      setQuery("");
    }
  };

  const editItem = (id) => {
    if (!isEditing) {
      // !const element = document.getElementById(editID);
      // console.log(element.getBoundingClientRect());

      const specificItem = list.find((item) => item.id === id);
      setIsEditing(true);
      setEditID(id);
      setImage(specificItem.image);
      setQuery(specificItem.text);
      setText(specificItem.text);
      window.scrollTo(0, 0);

      showAlert(true, "Please edit the note:", "success");
    } else if (id === editID) {
      showAlert(true, "The Note is already being edited", "danger");
      window.scrollTo(0, 0);
    } else {
      showAlert(true, "A Note is already being edited", "danger");
    }
  };
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "The note has been deleted", "danger");
    setDeleteAlert(false);
  };
  const deleteEditingNote = (id) => {
    if (id === editID) {
      showAlert(true, "The note is being edited", "danger");
      window.scrollTo(0, 0);
    } else {
      setID(id);
      setDeleteAlert(true);
    }
  };

  const logOutWhileLoading = () => {
    logout({ returnTo: window.location.origin });
    if (isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            if (item.text === text && item.image === image) {
              return item;
            } else {
              return {
                ...item,
                text: text,
                image: image,
                edit: true,
                day1: dayInfo,
                month1: monthInfo,
                year1: yearInfo,
                hour1: hoursInfo,
                minutes1: minutesInfo,
              };
            }
          }
          return item;
        })
      );
      setImage("");
      setText("");
      setQuery("");
      setIsEditing(false);
      setEditID(null);
      showAlert(true, "All changes were saved", "success");
    }
  };

  // !authentification

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <AppContext.Provider
      value={{
        image,
        setImage,
        text,
        setText,
        query,
        setQuery,
        handleSubmit,
        setShowNotesPad,
        showNotesPad,
        saveNote,
        list,
        editItem,
        alert,
        showAlert,
        deleteItem,
        deleteAlert,
        setDeleteAlert,
        addImage,
        setImageEditAdd,
        ellipsis,
        editID,
        deleteEditingNote,
        logOutWhileLoading,
        refContainer,
        ID,
        isEditing,
        seeText,
        setSeeText,
        wholeText,
        setWholeText,
        seeWholeText,
        loginWithRedirect,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
