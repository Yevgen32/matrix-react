// // flow
// import React, { Component } from "react";
// import Row from "./Row.js";
// import "./App.css";
// import Cell from "./Cell";
//
// type Props = {};
//
// type State = {
//   m: number,
//   n: number,
//   x: number,
//   matrix: [],
//   sumRow: [],
//   averageCol: [],
//   comingItem: []
// };
//
// export default class App extends Component<Props, State> {
//   state = {
//     m: 10,
//     n: 7,
//     x: 3,
//     matrix: [],
//     sumRow: [],
//     averageCol: [],
//     comingItem: []
//   };
//
//   getRandomNumber = (min: number, max: number) =>
//     Math.floor(Math.random() * (max - min) + min);
//
//   generationId = () =>
//     "_" +
//     Math.random()
//       .toString(36)
//       .substr(2, 5);
//
//   getObjectCell = (value: number) => {
//     return {
//       id: this.generationId(),
//       amount: value
//     };
//   };
//
//   createMatrix = (rows: number, cols: number): {} =>
//     Array.from({ length: cols }, () =>
//       Array.from({ length: rows }, () =>
//         this.getObjectCell(this.getRandomNumber(100, 999))
//       )
//     );
//
//   getSumRow = (matrix: []): [] =>
//     matrix.map((item: []) =>
//       item.reduce((acc, cur: { id: string, amount: number }) => {
//         return acc + cur.amount;
//       }, 0)
//     );
//
//   getAverageCol = (matrix: []): [] =>
//     matrix
//       .flatMap((it: []) => it)
//       .reduce(
//         (acc, item: { id: string, amount: number }, i) => (
//           (acc[i % matrix[0].length] += item.amount), acc
//         ),
//         Array.apply(0, Array(matrix[0].length)).map(() => 0)
//       )
//       .map((item: { id: string, amount: number }) =>
//         Math.floor(item / this.state.n)
//       );
//
//   counter = (cur: { id: string, amount: number }): [] => {
//     const counterMatrix = this.state.matrix.map((row: []) =>
//       row.map((col: { id: string, amount: number }) =>
//         col.id === cur.id ? { ...col, amount: col.amount + 1 } : col
//       )
//     );
//     this.getComingItem(cur);
//     this.setState({
//       matrix: counterMatrix,
//       sumRow: this.getSumRow(counterMatrix),
//       averageCol: this.getAverageCol(counterMatrix)
//     });
//   };
//
//   initState = () => {
//     const matrix = this.createMatrix(this.state.m, this.state.n);
//     const sumRow = this.getSumRow(matrix);
//     this.setState({
//       matrix: matrix,
//       sumRow: sumRow,
//       averageCol: this.getAverageCol(matrix)
//     });
//   };
//
//   getComingItem = (cur: { id: string, amount: number }) => {
//     const comingItem = Array.from(
//       this.state.matrix.flatMap((cell: { id: string, amount: number }) => cell)
//     )
//       .sort(
//         (
//           a: { id: string, amount: number },
//           b: { id: string, amount: number }
//         ) => Math.abs(cur.amount - a.amount) - Math.abs(cur.amount - b.amount)
//       )
//       .slice(0, Number(this.state.x) + 1)
//       .map((elem: {}) => {
//         return { id: elem.id, rowIndex: 1 };
//       });
//
//     this.setState({
//       comingItem: comingItem
//     });
//   };
//
//   updateState = () => {}
//
//   clearStateComing = () => {
//     this.setState({
//       comingItem: []
//     });
//   };
//   render() {
//     return (
//       <div>
//         <button className="elemCreate" onClick={this.initState}>
//           click
//         </button>
//         <table>
//           <tbody>
//             {this.state.matrix.map((row: [], i: number) => (
//               <Row
//                 matrix={this.state.matrix}
//                 getComingItem={this.getComingItem}
//                 comingItem={this.state.comingItem}
//                 rowIndex={i}
//                 key={i}
//                 onClickElem={this.counter}
//                 row={row}
//                 sumRow={this.state.sumRow[i]}
//                 clearStateComing={this.clearStateComing}
//               />
//             ))}
//             {this.state.averageCol.length !== 0 ? (
//               <Row row={this.state.averageCol} />
//             ) : null}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

import React, { useState } from "react";
import Row from "./Row";
import "./App.css";

const App = () => {
  const [m] = useState(5);
  const [n] = useState(5);
  const [x] = useState(10);
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
            // eslint-disable-next-line
          (acc[i % matrix[0].length] += item.amount), acc
        ),
        Array.apply(0, Array(matrix[0].length)).map(() => 0)
      )
      .map((item: { id: string, amount: number }) => Math.floor(item / n));

   const initState = () => {
    const matrix = createMatrix(m, n);
    setMatrix(matrix);
    setSumRow(getSumRow(matrix));
    setAverageCol(getAverageCol(matrix));
  };

  const counter = event => {
    const matrixAfterCounter = matrix.map(row =>
      row.map(col =>
        col.id === event.target.getAttribute("cell-id")
          ? { ...col, amount: col.amount + 1 }
          : col
      )
    );
    setMatrix(matrixAfterCounter);
    setSumRow(getSumRow(matrixAfterCounter));
    setAverageCol(getAverageCol(matrixAfterCounter));
    hover(event)
  };

  const hover = event => {
    const rowI = event.target.getAttribute("row-i");
    const cellId = event.target.getAttribute("cellId");
    if (event.target.getAttribute("cell-id")) {
      const comingItem = Array.from(
        matrix.flatMap((cell: { id: string, amount: number }) => cell)
      )
        .sort(
          (
            a: { id: string, amount: number },
            b: { id: string, amount: number }
          ) =>
            Math.abs(event.target.innerHTML - a.amount) -
            Math.abs(event.target.innerHTML - b.amount)
        )
        .slice(0, Number(x) + 1)
        .map((elem: {}) => {
          return elem.id;
        });
      setComingItems(comingItem);
    } else if (!cellId) {
      setComingItems([]);
    }
    if (rowI) {
      const percentRowArray = matrix[rowI].map(cell =>
        parseFloat((cell.amount * 100) / sumRow[rowI]).toFixed(1)
      );
      setPercentRow(percentRowArray);
        setIndexSumRow(rowI);
    }else if (!rowI) {
        setPercentRow([]);
    }
  };

  return (
    <div>
      <button onClick={initState}>create</button>
      <table
        onClick={event => counter(event)}
        onMouseOver={event => hover(event)}
        // onMouseOut={event => clearState(event)}
      >
        <tbody>
          {matrix.map((row, rowI) => (
            <Row
                // eslint-disable-next-line
              isPercent={indexSumRow == rowI}
              rowSumIndex={indexSumRow}
              key={rowI}
              rowI={rowI}
              sumRow={sumRow[rowI]}
              row={row}
              percentRow={percentRow}
              comingItems={comingItems}
            />
          ))}
          {averageCol.length !== 0 ? <Row key={generationId()} row={averageCol} /> : null}
        </tbody>
      </table>
    </div>
  );
};

export default App;