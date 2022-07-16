import './App.css';
import { useState } from 'react';

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  const [sudokuArr, setSudokuArr] = useState(myArr);

  

  function onInputChange(e, row, col) {
    setSudokuArr(() => {
      const updatedArr = sudokuArr
      for (let i = 0; i < updatedArr.length; i++) {
        for (let j = 0; j < updatedArr[i].length; j++) {
          if (i == row && j == col) {
            updatedArr[i][j] = parseInt(e.target.value)
          }
        }
      }
      return updatedArr
    })
  }

  function solveClick() {
    fetch('https://sudoku-solver-jesushzv.herokuapp.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ board: sudokuArr })
    }).then((response) => {
      return response.json()
    }
    ).then((response) => {
      setSudokuArr(() => {
        let solved = response["answer"]
        let updatedArr = sudokuArr
        for(let i = 0; i < updatedArr.length; i ++){
          for(let j = 0; j < updatedArr[i].length; j++){
            updatedArr[i][j] = solved[i][j]
          }
        }
        return updatedArr
      })
    })
  };

function reset() {
  window.location.reload();
}


  return (
    <div className="App">
      <div className='App-header'>
        <h2>Sudoku Solver</h2>
        <table>
          <tbody>
            {
              sudokuArr.map((row, index) => {
                return (
                  <tr key={index} className={(row + 1) % 3 === 0 ? 'bottomBorder' : ''}>
                    {
                    row.map((col, indexC) => {
                      return ( <td key={index + indexC} className={(col + 1) % 3 === 0 ? 'sideBorder' : ''}>
                      <input onChange={(e) => onInputChange(e, row, col)} className='cell-block' disabled={myArr[row][col] !== 0} ></input>
                    </td>
                      )
                    })}
                  </tr>
                )
              }) || <div>Loading...</div>
            }
          </tbody>
        </table>
        <div className='buttons'>
          <button className='solveBtn' onClick={() => solveClick()}>Solve</button>
          <button className='resetBtn' onClick={() => reset()}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;

{/*{
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                return <tr key={rIndex} className={(row + 1) % 3 === 0 ? 'bottomBorder' : ''}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                    return <td key={rIndex + cIndex} className={(col + 1) % 3 === 0 ? 'sideBorder' : ''}>
                      <input onChange={(e) => onInputChange(e, row, col)} className='cell-block' disabled={myArr[row][col] !== 0} />
                    </td>
                  })}
                </tr>
              })
            } */}