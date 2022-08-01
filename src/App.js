import React, { useState } from "react";
import "./App.css";
import Modal from "react-modal";
import axios from "axios";
import { DICT_URL } from "./config/config";
import ModalComponent from "./utils/modalComponent";
import TextAreaComponent from "./components/textAreaComponent";

function App() {
  return (
    <div className="App">
      <TextAreaComponent />
    </div>
  );
}

export default App;
