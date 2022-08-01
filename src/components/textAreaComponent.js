import React, { useState } from "react";
import axios from "axios";
import { DICT_URL } from "../config/config";
import ModalComponent from "../utils/modalComponent";

export default function TextAreaComponent() {
  //DATA STATES
  const [textBoxText, settextBoxtext] = useState("");
  const [showText, setshowText] = useState("");
  const [wordMeaningArr, setwordMeaningArr] = useState([]);

  //CONTROL CONTENT STATES
  const [ismodalOpen, setismodalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  //Get the content from textarea,
  function handleTextChange(e) {
    settextBoxtext(e.target.value);
  }

  //Save content to show
  function handleSubmit() {
    setshowText(textBoxText);
  }

  function showModal(word) {
    setisLoading(true);
    axios
      .get(DICT_URL + word.replace(/[^a-zA-Z ]/g, ""), {})
      .then(function (response) {
        setwordMeaningArr(response.data);
        setisLoading(false);
      })
      .catch(function (error) {
        setwordMeaningArr({
          title: "No Definitions Found",
          message:
            "Sorry pal, we couldn't find definitions for the word you were looking for.",
        });
        setisLoading(false);
        console.log(error);
      });
    setismodalOpen(true);
  }

  //return html content to display in the modal
  function modalContent() {
    return (
      <div>
        {isLoading ? (
          <div>Loading.....</div>
        ) : (
          <div>
            {wordMeaningArr.title ? (
              <div>{wordMeaningArr.message}</div>
            ) : (
              wordMeaningArr.map((wordArr, wordArrindex) => {
                return wordArr.meanings.map((meaning, meaningIndex) => {
                  return meaning.definitions.map((def, defIndex) => {
                    return (
                      <div
                        key={wordArrindex + "_" + meaningIndex + "_" + defIndex}
                      >
                        {def.definition}
                      </div>
                    );
                  });
                });
              })
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <ModalComponent
        ismodalOpen={ismodalOpen}
        closeFunc={() => {
          setismodalOpen(false);
        }}
        modalContent={modalContent()}
      />
      <div>
        <textarea
          value={textBoxText}
          placeholder="type a paragraph(500 words max)"
          cols="50"
          rows="10"
          maxlength="500"
          onChange={handleTextChange}
        ></textarea>
      </div>
      <div>
        <button onClick={handleSubmit}>show</button>
      </div>
      <div style={{ padding: 20 }}>
        {showText.split(" ").map((word, index) => {
          if (word.length > 5) {
            return (
              <span>
                <span
                  key={index}
                  onClick={() => {
                    showModal(word);
                  }}
                  style={styles.underlineTxt}
                >
                  {word}
                </span>
                <span> </span>
              </span>
            );
          } else {
            return <span key={index}>{word + " "}</span>;
          }
        })}
      </div>
    </div>
  );
}

const styles = {
  underlineTxt: {
    textDecoration: "underline",
    cursor: "pointer",
  },
};
