import './App.css';
import { useState } from 'react';

function App() {

  const myArr = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]

    const [sudokuArr, setSudokuArr] = useState(myArr);

    function onInputChange(e, row, col) {
      setSudokuArr(() => {
        const updatedArr = sudokuArr
        for(let i = 0; i < updatedArr.length; i++){
          for(let j = 0; j < updatedArr[i].length; j++){
            if(i == row && j == col){
                updatedArr[i][j] = e.target.value
            }
          }
        }
        return updatedArr
      })
    }

  function solveClick () {
    (async () => {
      const api = await fetch('https://sudoku-solver-jesushzv.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({board : sudokuArr})
      });
      const content = await api.json();
      setSudokuArr(content)
    })();
  }


  return (
    <div className="App">
      <div className='App-header'>
        <h2>Sudoku Solver</h2>
        <table>
          <tbody>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                return <tr key={rIndex} className={(row + 1) % 3 === 0 ? 'bottomBorder' : ''}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                    return <td key={rIndex + cIndex} className={(col + 1) % 3 === 0 ? 'sideBorder' : ''}>
                    <input onChange={(e) => onInputChange(e, row, col)} className='cell-block' disabled={myArr[row][col] !== -1} />
                  </td>
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
        <div className='buttons'>
          <button className='solveBtn' onClick={() => solveClick()}>Solve</button>
          <button className='resetBtn'>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
