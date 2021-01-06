import './App.css';
import React, { useState, useEffect } from 'react';
import useWindowsWidth from './useWindowWidth.js';

function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g, (letter) => (usedLetters.includes(letter) ? letter : '_')  )
}

function genCharArray(charA, charZ) {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
  }
  return a;
}

function won(word, letters) {
  for (var i = 0; i < word.length; i++) {
    if (!letters.includes(word[i])) {
      return false;
    }
  }
  return true;
}

function App() {
  const [usedLetters, setUsedLetters] = useState([]);
  var things = ['rock', 'paper', 'scissor'];
  
  const [word, setWord] = useState(things[Math.floor(Math.random()*things.length)]);

  const onSmallScreen = useWindowsWidth();

  return (
    <div className={`App ${onSmallScreen ? "small" : "large"}`}>
      <header className="App-header">
      <div>The word is {computeDisplay(word, usedLetters)} , a {word.length} letter word</div>
      <div>Number of try : {usedLetters.length}</div>
      {!won(word, usedLetters) ? 
        <div>
          <div>{genCharArray('a', 'm').map((letter) => (<button disabled={usedLetters.indexOf(letter) > -1} key={letter} onClick={() => setUsedLetters([...usedLetters, letter])}>{letter.toUpperCase()}</button>))}</div>
          <div>{genCharArray('n', 'z').map((letter) => (<button disabled={usedLetters.indexOf(letter) > -1} key={letter} onClick={() => setUsedLetters([...usedLetters, letter])}>{letter.toUpperCase()}</button>))}</div>
        </div>
      :
        <button onClick={() => {setUsedLetters([]); setWord(things[Math.floor(Math.random()*things.length)])}}>Restart ?</button>
      }
      </header>
    </div>
  );
}

export default App;
