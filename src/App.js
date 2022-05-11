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
  const [points, setPoints] = useState(30);
  const reset = () => {
    randomDeal();
    /*  let arr = [...table];
    arr.map((item) => (item.flag = false)); */
    //setTable(arr);
    setOpenCards([]);
    setPoints(30);
    setShot(0);
    setAudio(new Audio("images/sound2.mp3"));
  };

  //recursive function for random dealing
  const randomDeal = () => {
    if (cards.length < 1) {
      setTable(dealedCards);
      console.log("test");
      return table;
    } else {
      let random = Math.floor(Math.random() * cards.length);
      let randomCard = cards.splice(random, 1);
      dealedCards.push(...randomCard);

      return randomDeal();
    }
  };
  const changeFlag = (item) => {
    let newTable = table.map((card) => {
      if (card.name === item.name && card.flag === false) {
        card.flag = true;
        setOpenCards([...openCards, card]);
        return card;
      } else {
        return card;
      }
    });
    setPoints(points - 1);
    setTable(newTable);
    if (points === 1 || table.every((item) => item.flag === true)) {
      setAudio(new Audio("images/sound1.mp3"));
    }
    if (points === 0) {
      audio.play();
      alert("kraj");
      reset();
    }
  };

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
          } else {
            return item;
          }
        });
        newTable.map((item) => {
          if (item.name === name2) {
            item.flag = false;
            return item;
          } else {
            return item;
          }
        });
      } else {
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
    <div>
      <h2 onClick={reset} className="title">
        Memory game
      </h2>
      <h2>shots {shot}</h2>
      <h2>points {points}</h2>

      <button className="btn-start" onClick={randomDeal}>
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
