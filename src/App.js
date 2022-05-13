import "./App.css";
import OneCard from "./oneCard";
import React from "react";
import { useState, useEffect } from "react";

let cards = [
  { name: "grapes", url: "images/grapes.jpg", flag: false },
  { name: "apple", url: "images/apple.jpg", flag: false },
  { name: "orange", url: "images/orange.jpg", flag: false },
  { name: "kivi", url: "images/kivi.jpg", flag: false },
  { name: "peach", url: "images/peach.jpg", flag: false },
  { name: "watermelon", url: "images/watermelon.jpg", flag: false },
  { name: "lemon", url: "images/lemon.jpg", flag: false },
  { name: "strawberry", url: "images/strawberry.jpg", flag: false },
  { name: "grapes1", url: "images/grapes.jpg", flag: false },
  { name: "apple1", url: "images/apple.jpg", flag: false },
  { name: "orange1", url: "images/orange.jpg", flag: false },
  { name: "kivi1", url: "images/kivi.jpg", flag: false },
  { name: "peach1", url: "images/peach.jpg", flag: false },
  { name: "watermelon1", url: "images/watermelon.jpg", flag: false },
  { name: "lemon1", url: "images/lemon.jpg", flag: false },
  { name: "strawberry1", url: "images/strawberry.jpg", flag: false },
];
let dealedCards = [];
function App() {
  const [table, setTable] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [audio, setAudio] = useState(new Audio("images/sound2.mp3"));
  const [shot, setShot] = useState(0);
  const [points, setPoints] = useState(40);

  const randomDeal = () => {
    if (cards.length < 1) {
      setTable(dealedCards);
      return table;
    } else {
      let random = Math.floor(Math.random() * cards.length);
      let randomCard = cards.splice(random, 1);
      dealedCards.push(...randomCard);
      return randomDeal();
    }
  };

  const showFinalResult = () => {
    dealedCards.map((item) => (item.flag = false));
    cards = [...dealedCards];
    dealedCards = [];
    setTable([]);
    setOpenCards([]);
    setAudio(new Audio("images/sound2.mp3"));
    setPoints(40);
    setShot(0);
    alert(`Osvojili ste ${points} poena.`);
  };

  const changeFlag = (item) => {
    let newTable = table.map((card) => {
      if (card.name === item.name && card.flag === false) {
        card.flag = true;
        setOpenCards([...openCards, card]);
        setPoints(points - 1);
        return card;
      } else {
        return card;
      }
    });

    setTable(newTable);
    if (table.every((item) => item.flag === true)) {
      setAudio(new Audio("images/sound1.mp3"));
      setTimeout(showFinalResult, 500);
    }
    if (points === 1) {
      setAudio(new Audio("images/sound1.mp3"));
    }
  };

  useEffect(() => {
    if (points === 0) {
      dealedCards.map((item) => (item.flag = false));
      audio.play();
      setTimeout(showFinalResult, 500);
    }
  }, [points]);

  const checkLastTwo = () => {
    let arr = [...openCards];
    let newTable = [...table];
    if (arr.length === 2 && arr[0].url === arr[1].url) {
      audio.play();
      setShot(shot + 1);
    }
    if (arr.length > 2) {
      if (arr[arr.length - 3].url !== arr[arr.length - 2].url) {
        let name1 = arr[arr.length - 3].name;
        let name2 = arr[arr.length - 2].name;
        newTable.map((item) => {
          if (item.name === name1) {
            item.flag = false;
            return item;
          }
        });
        newTable.map((item) => {
          if (item.name === name2) {
            item.flag = false;
            return item;
          }
        });
      }
      arr = arr.slice(2);
      setTable(newTable);
      setOpenCards(arr);
    }
  };
  const handleCard = (name) => {
    changeFlag(name);
  };
  useEffect(() => {
    checkLastTwo();
  }, [openCards, audio]);

  return (
    <div className="container">
      <h2 className="title">Memory game</h2>
      <div className="results">
        <h2>Shots: {shot}</h2>
        <h2>Points: {points}</h2>
      </div>
      <button className="btn-start" type="button" onClick={randomDeal}>
        START
      </button>
      <div className="App">
        {table.map((card, i) => (
          <div key={i}>
            <OneCard card={card} handleCard={handleCard} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
