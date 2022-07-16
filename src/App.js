import "./App.css";
import { useState } from "react";
import SudokuGrid from "./SudokuGrid";
import SolvedGrid from "./SolvedSudokuGrid";
import MessageBlock from "./MessageBlock";

function App() {
  const myArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [sudokuArr, setSudokuArr] = useState(myArr);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  function onInputChange(e, row, col) {
    setSudokuArr(() => {
      const updatedArr = sudokuArr;
      for (let i = 0; i < updatedArr.length; i++) {
        for (let j = 0; j < updatedArr[i].length; j++) {
          if (i === row && j === col) {
            updatedArr[i][j] = parseInt(e.target.value);
          }
        }
      }
      return updatedArr;
    });
  }

  function solveClick() {
    setLoading(true);
    fetch("https://sudoku-solver-jesushzv.herokuapp.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: sudokuArr }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setSudokuArr(() => {
          let solved = response["answer"];
          let updatedArr = sudokuArr;
          for (let i = 0; i < updatedArr.length; i++) {
            for (let j = 0; j < updatedArr[i].length; j++) {
              updatedArr[i][j] = solved[i][j];
            }
          }
          return updatedArr;
        });
        setMessage(response["message"]);
      })
      .then(() => {
        setIsSolved(true);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.message);
      });
  }
  function reset() {
    window.location.reload();
  }

  if (sudokuArr.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Sudoku Solver</h2>
          <table>
            <tbody>
              {sudokuArr && !isSolved && !Loading && (
                <SudokuGrid
                  sudokuArr={sudokuArr}
                  onInputChange={onInputChange}
                />
              )}
              {Loading && <div>Loading...</div>}
              {isSolved && <SolvedGrid sudokuArr={sudokuArr} />}
            </tbody>
          </table>

          {isSolved && <MessageBlock message={message} />}
          <div className="buttons">
            <button className="solveBtn" onClick={() => solveClick()}>
              Solve
            </button>
            <button className="resetBtn" onClick={() => reset()}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
