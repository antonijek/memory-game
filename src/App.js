import "./App.css";
import OneCard from "./oneCard";
import React from "react";
import { useState, useEffect } from "react";

let cards = [
  { name: "grapes", url: "images/grapes.jpg", isOpen: false },
  { name: "apple", url: "images/apple.jpg", isOpen: false },
  { name: "orange", url: "images/orange.jpg", isOpen: false },
  { name: "kivi", url: "images/kivi.jpg", isOpen: false },
  { name: "lemon", url: "images/lemon.jpg", isOpen: false },
  { name: "strawberry", url: "images/strawberry.jpg", isOpen: false },
  { name: "grapes1", url: "images/grapes.jpg", isOpen: false },
  { name: "apple1", url: "images/apple.jpg", isOpen: false },
  { name: "orange1", url: "images/orange.jpg", isOpen: false },
  { name: "kivi1", url: "images/kivi.jpg", isOpen: false },
  { name: "lemon1", url: "images/lemon.jpg", isOpen: false },
  { name: "strawberry1", url: "images/strawberry.jpg", isOpen: false },
];
let dealedCards = [];
function App() {
  const [table, setTable] = useState([]);
  const [cardPairs, setCardPairs] = useState([]);
  const [shot, setShot] = useState(0);
  const [points, setPoints] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("You lost!");

  let sound1 = new Audio("../audios/sound1.mp3");
  let sound2 = new Audio("../audios/sound2.wav");
  let sound3 = new Audio("../audios/sound3.wav");

  const randomDeal = (arr1, arr2) => {
    if (arr1.length < 1) {
      setTable(arr2);
      return table;
    } else {
      let random = Math.floor(Math.random() * arr1.length);
      let randomCard = arr1.splice(random, 1);
      arr2.push(...randomCard);
      return randomDeal(arr1, arr2);
    }
  };

  const showFinalResult = () => {
    setTable([]);
    setIsOpen(true);
  };

  const handleOpenStatus = (item) => {
    let newTable = table.map((card) => {
      if (card.name === item.name && card.isOpen === false) {
        card.isOpen = true;
        setCardPairs([...cardPairs, card]);
        return card;
      } else {
        return card;
      }
    });
    setTable(newTable);
  };

  const checkIsFinish = () => {
    if (points === 0) {
      sound2.play();
      setTimeout(showFinalResult, 100);
    }
    if (table.length > 0 && table.every((item) => item.isOpen === true)) {
      sound1.play();
      setTimeout(showFinalResult, 500);
      setMessage("You won!");
    }
  };
  useEffect(() => {
    randomDeal(cards, dealedCards);
  }, []);
  useEffect(() => {
    checkIsFinish();
  }, [points, cardPairs]);

  useEffect(() => {
    checkLastTwo();
  }, [cardPairs]);

  const backToFalse = (name) => {
    let newTable = [...table];
    newTable.map((item) => {
      if (item.name === name) {
        item.isOpen = false;
        return item;
      }
    });
    setTable(newTable);
  };

  const checkLastTwo = () => {
    let arr = [...cardPairs];
    if (arr.length === 2 && arr[0].url === arr[1].url) {
      sound3.play();
      setShot(shot + 1);
    }
    if (arr.length === 2 && arr[0].url !== arr[1].url) {
      setPoints(points - 2);
    }
    if (arr.length > 2) {
      if (arr[arr.length - 3].url !== arr[arr.length - 2].url) {
        let name1 = arr[arr.length - 3].name;
        let name2 = arr[arr.length - 2].name;
        backToFalse(name1);
        backToFalse(name2);
      }
      arr = arr.slice(2);
      setCardPairs(arr);
    }
  };
  const reset = () => {
    dealedCards.map((item) => (item.isOpen = false));
    cards = [...dealedCards];
    dealedCards = [];
    setTable([]);
    setCardPairs([]);
    setPoints(10);
    setShot(0);
    setIsOpen(false);
    setMessage("You lost!");
    randomDeal(cards, dealedCards);
  };
  return (
    <div className="container">
      <div className="results">
        <h2>
          Score:<span> {shot}</span>
        </h2>
        <h2 className="title">MEMORY GAME</h2>
        <h2>
          Attempts:<span> {Math.ceil(points / 2)}</span>
        </h2>
      </div>

      <div className="App">
        {table.map((card, i) => (
          <div key={i}>
            <OneCard card={card} handleOpenStatus={handleOpenStatus} />
          </div>
        ))}
      </div>
      {isOpen === true ? (
        <div className="gray-wall">
          <div className="result">
            <p>{message}</p>
            <p>Do you want new game?</p>
            <button onClick={reset}>Yes, please!</button>
            <button onClick={() => setIsOpen(false)}>No, thank`s</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
