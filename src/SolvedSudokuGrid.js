import React from "react";

const SolvedGrid = ({ sudokuArr }) => {
    if (!sudokuArr) {
        return <div>Loading...</div>;
    }
    return (
        <>
        {sudokuArr.map((row, rowIndex) => (
            <tr className={(row + 1) % 3 === 0 ? 'bottomBorder' : ''} key={rowIndex}>
            {row.map((col, colIndex) => (
                <td className={(col + 1) % 3 === 0 ? 'sideBorder' : ''} key={colIndex + rowIndex}>
                <input className='cell-block' disabled={true} value={col} />
                </td>
            ))}
            </tr>
        ))}
        </>
    );
    }
export default SolvedGrid;