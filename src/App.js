// // import React, { useState } from "react";
// // import Row from "./Row";
// // import "./App.css";
// //
// // const App = () => {
// //   const [m] = useState(20);
// //   const [n] = useState(15);
// //   const [x] = useState(20);
// //   const [matrix, setMatrix] = useState([]);
// //   const [sumRow, setSumRow] = useState([]);
// //   const [averageCol, setAverageCol] = useState([]);
// //   const [comingItems, setComingItems] = useState([]);
// //   const [percentRow, setPercentRow] = useState([]);
// //   const [nowIndex, setNowIndex] = useState(null);
// //
// //   const getRandomNumber = (min: number, max: number) =>
// //     Math.floor(Math.random() * (max - min) + min);
// //
// //   const generationId = () =>
// //     "_" +
// //     Math.random()
// //       .toString(36)
// //       .substr(2, 5);
// //
// //   const getObjectCell = (value: number) => {
// //     return {
// //       id: generationId(),
// //       amount: value
// //     };
// //   };
// //
// //   const createMatrix = (rows, cols) =>
// //     Array.from({ length: cols }, () =>
// //       Array.from({ length: rows }, () =>
// //         getObjectCell(getRandomNumber(100, 999))
// //       )
// //     );
// //
// //   const getSumRow = (matrix: []): [] => {
// //     return matrix.map((item: []) =>
// //       item.reduce((acc, cur: { id: string, amount: number }) => {
// //         return acc + cur.amount;
// //       }, 0)
// //     );
// //   };
// //
// //   const getAverageCol = (matrix: []): [] => {
// //     return matrix
// //       .flatMap((it: []) => it)
// //       .reduce(
// //         (acc, item: { id: string, amount: number }, i) => (
// //           (acc[i % matrix[0].length] += item.amount), acc
// //         ),
// //         Array.apply(0, Array(matrix[0].length)).map(() => 0)
// //       )
// //       .map((item: { id: string, amount: number }) => Math.floor(item / n));
// //   };
// //
// //   const initState = () => {
// //     const matrix = createMatrix(m, n);
// //     setMatrix(matrix);
// //     setSumRow(getSumRow(matrix));
// //     setAverageCol(getAverageCol(matrix));
// //   };
// //
// //   const counter = cur => {
// //     const matrixCount = matrix.map(row =>
// //       row.map(col =>
// //         col.id === cur.id ? { ...col, amount: col.amount + 1 } : col
// //       )
// //     );
// //     getComingItems(cur);
// //     setMatrix(matrixCount);
// //     setSumRow(getSumRow(matrixCount));
// //     setAverageCol(getAverageCol(matrixCount));
// //   };
// //
// //   const getComingItems = cur => {
// //     const comingItem = Array.from(
// //       matrix.flatMap((cell: { id: string, amount: number }) => cell)
// //     )
// //       .sort(
// //         (
// //           a: { id: string, amount: number },
// //           b: { id: string, amount: number }
// //         ) => Math.abs(cur.amount - a.amount) - Math.abs(cur.amount - b.amount)
// //       )
// //       .slice(0, Number(x) + 1)
// //       .map((elem: {}) => {
// //         return elem.id;
// //       });
// //     setComingItems(comingItem);
// //   };
// //
// //   const clearStateComing = () => {
// //     setComingItems([]);
// //   };
// //
// //   const getPercentRow = indexSum => {
// //     const percentRowFunction = matrix[indexSum].map(cell =>
// //       parseFloat((cell.amount * 100) / sumRow[indexSum]).toFixed(1)
// //     );
// //     setPercentRow(percentRowFunction);
// //     setNowIndex(indexSum);
// //   };
// //
// //   const clearStateRowPercent = () => {
// //     setNowIndex(null);
// //     setPercentRow([]);
// //   };
// //
// //   const setIsComingRowBool = (row: [{ id: string, amount: number }]) =>
// //     row
// //       .map(cell => comingItems.some((id: string) => id === cell.id))
// //       .some((col: boolean) => col);
// //
// //   return (
// //     <div>
// //       <button className="elemCreate" onClick={initState}>
// //         create
// //       </button>
// //       <table>
// //         <tbody>
// //           {matrix.map((row, rowI) => (
// //             <Row
// //               percentRow={percentRow}
// //               clearStateRowPercent={clearStateRowPercent}
// //               getComingItems={getComingItems}
// //               getPercentRow={getPercentRow}
// //               isComingRow={setIsComingRowBool(row)}
// //               clearStateComing={clearStateComing}
// //               key={rowI}
// //               rowI={rowI}
// //               sumRow={sumRow[rowI]}
// //               row={nowIndex === rowI ? percentRow : row}
// //               counter={counter}
// //               comingItems={comingItems}
// //             />
// //           ))}
// //           {averageCol.length !== 0 ? (
// //             <Row key="rowKey1" classAverageCol="sumColumn" row={averageCol} />
// //           ) : null}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };
// //
// // export default App;
//
// import React, { useState } from "react";
// import Row from "./Row";
// import "./App.css";
//
// const App = () => {
//   const [m] = useState(7);
//   const [n] = useState(5);
//   // const [x] = useState(20);
//   const [matrix, setMatrix] = useState([]);
//   const [sumRow, setSumRow] = useState([]);
//   const [averageCol, setAverageCol] = useState([]);
//   // const [comingItems, setComingItems] = useState([]);
//   // const [percentRow, setPercentRow] = useState([]);
//   // const [nowIndex, setNowIndex] = useState(null);
//
//   const getRandomNumber = (min: number, max: number) =>
//     Math.floor(Math.random() * (max - min) + min);
//
//   const generationId = () =>
//     "_" +
//     Math.random()
//       .toString(36)
//       .substr(2, 5);
//
//   const getObjectCell = (value: number) => {
//     return {
//       id: generationId(),
//       amount: value
//     };
//   };
//
//   const createMatrix = (rows, cols) =>
//     Array.from({ length: cols }, () =>
//       Array.from({ length: rows }, () =>
//         getObjectCell(getRandomNumber(100, 999))
//       )
//     );
//
//   const getSumRow = (matrix: []): [] => {
//     return matrix.map((item: []) =>
//       item.reduce((acc, cur: { id: string, amount: number }) => {
//         return acc + cur.amount;
//       }, 0)
//     );
//   };
//
//   const getAverageCol = (matrix: []): [] => {
//     return matrix
//       .flatMap((it: []) => it)
//       .reduce(
//         (acc, item: { id: string, amount: number }, i) => (
//           (acc[i % matrix[0].length] += item.amount), acc
//         ),
//         Array.apply(0, Array(matrix[0].length)).map(() => 0)
//       )
//       .map((item: { id: string, amount: number }) => Math.floor(item / n));
//   };
//
//   const initState = () => {
//     const matrix = createMatrix(m, n);
//     setMatrix(matrix);
//     setSumRow(getSumRow(matrix));
//     setAverageCol(getAverageCol(matrix));
//   };
//
//   return (
//     <div>
//       <button onClick={initState} className="elemCreate">
//         create matrix
//       </button>
//       <table>
//         <tbody>
//           {matrix.map((row, rowI) => (
//             <Row row={row} key={rowI} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// export default App;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createMatrixAction,
  getValueM,
  getValueN,
  getValueX,
  getSumRowAction,
  getAverageColAction
} from "./action/index";
import Row from "./component/Row";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const allStore = useSelector(state => state);
  const matrix = useSelector(state => state.matrix);
  const m = useSelector(state => state.m);
  const n = useSelector(state => state.n);
  const x = useSelector(state => state.x);
  const averageCol = useSelector(state => state.averageCol);
  const percentRow = useSelector(state=> state.percentRow);
  const nowIndex = useSelector(state=> state.rowIndex);

  const handleInitM = event => {
    dispatch(getValueM(Number(event.target.value)));
  };
  const handleInitN = event => {
    dispatch(getValueN(Number(event.target.value)));
  };
  const handleInitX = event => {
    dispatch(getValueX(Number(event.target.value)));
  };

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

  const handleCreateMatrix = () => {
    const matrix = createMatrix(n, m);
    dispatch(createMatrixAction(matrix));
    dispatch(getSumRowAction());
    dispatch(getAverageColAction());
  };

    // const setIsComingRowBool = (row: [{ id: string, amount: number }]) =>
    // row
    //   .map(cell => comingItems.some((id: string) => id === cell.id))
    //   .some((col: boolean) => col);

  return (
    <div>
      <button className="elemCreate" onClick={handleCreateMatrix}>
        CREATE MATRIX
      </button>
      <input
        type="number"
        value={m}
        placeholder="Input M:"
        onChange={handleInitM}
      />
      <input
        type="number"
        value={n}
        placeholder="Input M:"
        onChange={handleInitN}
      />
      <input
        type="number"
        value={x}
        placeholder="Input M:"
        onChange={handleInitX}
      />
      <table>
        <tbody>
          {/*{console.log(allStore)}*/}
          {matrix.map((row, rowIndex) => (
            <Row row={nowIndex === rowIndex ? percentRow : row} key={rowIndex} /*setIsComingRowBool={setIsComingRowBool(row)}*/ rowIndex={rowIndex} />
          ))}
          {<Row classAverageCol="sumColumn" row={averageCol} />}
        </tbody>
      </table>
    </div>
  );
};

export default App;
