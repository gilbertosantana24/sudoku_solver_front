import './App.css';
import { useState } from 'react';

function App() {

  const myArr = [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1]
  ]

    const [sudokuArr, setSudokuArr] = useState(myArr);

    function onInputChange() {

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
                    <input onChange={(e) => onInputChange(e, row, col)} value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]} className='cell-block' disabled={myArr[row][col] !== -1} />
                  </td>
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
        <div className='buttons'>
          <button className='solveBtn'>Solve</button>
          <button className='resetBtn'>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
