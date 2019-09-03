import React, { useState } from "react";
import Row from "./Row";
import "./App.css";
import Cell from "./Cell";

const App = () => {
  const [m] = useState(6);
  const [n] = useState(4);
  const [x] = useState(3);
  const [matrix, setMatrix] = useState([]);
  const [sumRow, setSumRow] = useState([]);
  const [averageCol, setAverageCol] = useState([]);
  const [comingItems, setComingItems] = useState([]);
  const [percentRow, setPercentRow] = useState([]);
  const [indexSumRow, setIndexSumRow] = useState(null);

  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const generationId = () =>
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 5);

  const getObjectCell = (value: number) => {
    return {
      id: generationId(),
      amount: value
    };
  };

  const createMatrix = (rows, cols) =>
    Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () =>
        getObjectCell(getRandomNumber(100, 999))
      )
    );

  const getSumRow = (matrix: []): [] =>
    matrix.map((item: []) =>
      item.reduce((acc, cur: { id: string, amount: number }) => {
        return acc + cur.amount;
      }, 0)
    );

  const getAverageCol = (matrix: []): [] =>
    matrix
      .flatMap((it: []) => it)
      .reduce(
        (acc, item: { id: string, amount: number }, i) => (
          (acc[i % matrix[0].length] += item.amount), acc
        ),
        Array.apply(0, Array(matrix[0].length)).map(() => 0)
      )
      .map((item: { id: string, amount: number }) => Math.floor(item / n));

  function initState() {
    const matrix = createMatrix(m, n);
    setMatrix(matrix);
    setSumRow(getSumRow(matrix));
    setAverageCol(getAverageCol(matrix));
  }

  const counter = (cur) => {
    const matrixCount = matrix.map((row)=>row.map((col)=> col.id===cur.id ? {...col, amount: col.amount+1}:col))
    setMatrix(matrixCount);
    setSumRow(getSumRow(matrixCount));
    setAverageCol(getAverageCol(matrixCount));
  };

  const getComingItems = (cur) => {
    const comingItem = Array.from(
          matrix.flatMap((cell: { id: string, amount: number }) => cell)
        )
          .sort(
            (
              a: { id: string, amount: number },
              b: { id: string, amount: number }
            ) =>
              Math.abs(cur.amount - a.amount) -
              Math.abs(cur.amount - b.amount)
          )
          .slice(0, Number(x) + 1)
          .map((elem: {}) => {
            return elem.id;
          });
        setComingItems(comingItem);
  };

  return (
    <div>
      <button className='elemCreate' onClick={initState}>create</button>
      <table>
        <tbody>
          {matrix.map((row, rowI) => (
            <Row
                getComingItems={getComingItems}
                // isComingRow={}
              // isPercent={indexSumRow == rowI}
              // rowSumIndex={indexSumRow}
              key={rowI}
              rowI={rowI}
              sumRow={sumRow[rowI]}
              row={row}
              counter={counter}
              // percentRow={percentRow}
              // comingItems={comingItems}
            />
          ))}
          {averageCol.length!==0 ? <Row key='rowKey1' row={averageCol} averageCol='sumColumn'/>: null}
        </tbody>
      </table>
    </div>
  );
};

export default App;
