import React from "react";
import "./App.css";


const SudokuGrid = ({ sudokuArr, onInputChange }) => {
    if (!sudokuArr) {
        return <div>Loading...</div>;
    }
    return (
        <>
        {sudokuArr.map((row, rowIndex) => (
            <tr className={(row + 1) % 3 === 0 ? 'bottomBorder' : ''} key={rowIndex}>
            {row.map((col, colIndex) => (
                <td className={(col + 1) % 3 === 0 ? 'sideBorder' : ''} key={colIndex + rowIndex}>
                <input className='cell-block' onChange={(e) => onInputChange(e, rowIndex, colIndex)}/>
                </td>
            ))}
            </tr>
        ))}
        </>
    );
    }

    export default SudokuGrid;

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