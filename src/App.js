// // @flow
// import React, { Component } from "react";
// import Row from "./row";
// import "./App.css";
//
// export default class App extends Component {
//     state = {
//     m: 10,
//     n: 10,
//     x: 4,
//     matrix: [],
//     sumRow: [],
//     averageCol: [],
//     // percentMatrix: [],
//     // comingItem: new Set()
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
//   createMatrix = (rows, cols) =>
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
//   initState = () => {
//     const matrix = this.createMatrix(this.state.m, this.state.n);
//     const sumRow = this.getSumRow(matrix);
//     this.setState({
//       matrix: matrix,
//       sumRow: sumRow,
//       averageCol: this.getAverageCol(matrix),
//       // percentMatrix: this.percentMatrix(matrix, sumRow)
//     });
//   };
//
//   updateState = cur => {
//     const matrix = this.counter(cur);
//     const sumRow = this.getSumRow(matrix);
//     // this.comingItem(cur);
//     this.setState({
//       matrix: matrix,
//       sumRow: sumRow,
//       averageCol: this.getAverageCol(matrix),
//       // percentMatrix: this.percentMatrix(matrix, sumRow)
//     });
//   };
//
//   counter = (cur: { id: string, amount: number }): [] =>
//     this.state.matrix.map((row: []) =>
//       row.map((col: { id: string, amount: number }) =>
//         col.id === cur.id ? { ...col, amount: col.amount + 1 } : col
//       )
//     );
//
//   // percentMatrix = (matrix: [], sumRow: [number]): [] =>
//   //   matrix.map((row: [], i) =>
//   //     row.map((col: { id: string, amount: number }) =>
//   //       Math.floor((col.amount * 100) / sumRow[i])
//   //     )
//   //   );
//
//   // comingItem = (cur: { id: string, amount: number }): [] => {
//   //   const comingItem = Array.from(
//   //     this.state.matrix.flatMap((cell: { id: string, amount: number }) => cell)
//   //   )
//   //     .sort(
//   //       (
//   //         a: { id: string, amount: number },
//   //         b: { id: string, amount: number }
//   //       ) => Math.abs(cur.amount - a.amount) - Math.abs(cur.amount - b.amount)
//   //     )
//   //     .slice(0, Number(this.state.x) + 1);
//   //
//   //   this.setState({
//   //     comingItem: comingItem
//   //   });
//   // };
//
//   // percentMatrix = (matrix: [], sumRow: [number]): [] =>
//   //   matrix.map((row: [], i) =>
//   //     row.map((col: { id: string, amount: number }) =>
//   //       Math.floor((col.amount * 100) / sumRow[i])
//   //     )
//   //   );
//
//   // clearState = () => {
//   //   this.setState({ comingItem: new Set() });
//   // };
//
//   render() {
//     return (
//       <div>
//         <button onClick={this.initState}>Create Matrix</button>
//         <table>
//           <tbody>
//             {this.state.matrix.map((row, i) => (
//               <Row
//                   matrix={this.state.matrix}
//                   comingX={this.state.x}
//                 // stateComing={this.state.comingItem}
//                 // comingItem={this.comingItem}
//                 // percentMatrix={this.state.percentMatrix[i]}
//                 sumRow={this.state.sumRow[i]}
//                 counter={this.updateState}
//                 row={row}
//                 key={i}
//                 indexRow={i}
//                 // clearState={this.clearState}
//               />
//             ))}
//             {this.state.matrix.length !== 0 ? (
//               <Row row={this.state.averageCol} />
//             ) : null}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import Row from "./Row.js";
import "./App.css";

export default class App extends Component {
  state = {
    m: 5,
    n: 6,
    x: 12,
    matrix: [],
    sumRow: [],
    averageCol: []
  };

  getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  generationId = () =>
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 5);

  getObjectCell = (value: number) => {
    return {
      id: this.generationId(),
      amount: value
    };
  };

  createMatrix = (rows, cols) =>
    Array.from({ length: cols }, (row, i) => {
      return {
        [i]: Array.from({ length: rows }, () =>
          this.getObjectCell(this.getRandomNumber(100, 999))
        )
      };
    });

  getSumRow = (matrix: []): [] =>
    matrix.map((item: [], i) =>
      item[i].reduce((acc, cur: { id: string, amount: number }) => {
        return acc + cur.amount;
      }, 0)
    );

  // getAverageCol = (matrix: []): [] =>
  //   matrix
  //     .flatMap((it: [], index) => it[index])
  //     .reduce(
  //       (acc, item: { id: string, amount: number }, i) => (
  //         (acc[i % matrix[0].length] += item[i].amount), acc
  //       ),
  //       Array.apply(0, Array(matrix[0].length)).map(() => 0)
  //     )
  //     .map((item: { id: string, amount: number }) =>
  //       Math.floor(item / this.state.n)
  //     );

  initState = () => {
    const matrix = this.createMatrix(this.state.m, this.state.n);
    const sumRow = this.getSumRow(matrix);
    this.setState({
      matrix: matrix,
      sumRow: sumRow,
      // averageCol: this.getAverageCol(matrix)
      // percentMatrix: this.percentMatrix(matrix, sumRow)
    });
  };

  render() {
    return (
      <div>
        <button className="elemCreate" onClick={this.initState}>
          click
        </button>
        <table>
          <tbody>
            {this.state.matrix.map((row, i) => (
              <Row index={i} key={i} row={row} sumRow={this.state.sumRow} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
