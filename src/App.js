//@flow
import React, { Component } from "react";
import Row from "./Row.js";
import "./App.css";

type Props = {};
type State = {
  m: number,
  n: number,
  x: number,
  matrix: [[{ id: string, amount: number }]],
  sumRow: [number],
  averageCol: [number],
  comingItem: [number],
  indexSum: number,
  percentRow: [number]
};

export default class App extends Component<Props, State> {
  state = {
    m: 100,
    n: 100,
    x: 30,
    matrix: [],
    sumRow: [],
    averageCol: [],
    comingItem: [],
    percentRow: [],
    indexSum: null
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

  createMatrix = (rows: number, cols: number): {} =>
    Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () =>
        this.getObjectCell(this.getRandomNumber(100, 999))
      )
    );

  getSumRow = (matrix: [[{ id: string, amount: number }]]) =>
    matrix.map((item: []) =>
      item.reduce((acc, cur: { id: string, amount: number }) => {
        return acc + cur.amount;
      }, 0)
    );

  getAverageCol = (matrix: [[{ id: string, amount: number }]]) =>
    matrix
      .flatMap((it: []) => it)
      .reduce(
        (acc, item: { id: string, amount: number }, i) => (
          (acc[i % matrix[0].length] += item.amount), acc
        ),
        Array.apply(0, Array(matrix[0].length)).map(() => 0)
      )
      .map((item: { id: string, amount: number }) =>
        Math.floor(item / this.state.n)
      );

  counter = (cur: { id: string, amount: number }) => {
    const counterMatrix = this.state.matrix.map(
      (row: [{ id: string, amount: number }]) =>
        row.map((col: { id: string, amount: number }) =>
          col.id === cur.id ? { ...col, amount: col.amount + 1 } : col
        )
    );
    this.getComingItem(cur);
    this.setState({
      matrix: counterMatrix,
      sumRow: this.getSumRow(counterMatrix),
      averageCol: this.getAverageCol(counterMatrix)
    });
  };

  initState = () => {
    const matrix = this.createMatrix(this.state.m, this.state.n);
    const sumRow = this.getSumRow(matrix);
    this.setState({
      matrix: matrix,
      sumRow: sumRow,
      averageCol: this.getAverageCol(matrix)
    });
  };

  getComingItem = (cur: { id: string, amount: number }) => {
    const comingItem = Array.from(
      this.state.matrix.flatMap((cell: { id: string, amount: number }) => cell)
    )
      .sort(
        (
          a: { id: string, amount: number },
          b: { id: string, amount: number }
        ) => Math.abs(cur.amount - a.amount) - Math.abs(cur.amount - b.amount)
      )
      .slice(0, Number(this.state.x) + 1)
      .map((elem: { id: string, amount: number }) => {
        return elem.id;
      });

    this.setState({
      comingItem: comingItem
    });
  };

  getPercentRow = (indexSum: number) => {
    const percentRow: [] = this.state.matrix[indexSum].map(cell =>
      parseFloat((cell.amount * 100) / this.state.sumRow[indexSum]).toFixed(1)
    );
    this.setState({ percentRow: percentRow, indexSum: indexSum });
  };

  clearStateIndexSumRow = () => {
    this.setState({
      indexSum: null,
      percentRow: []
    });
  };

  clearStateComing = () => {
    this.setState({
      comingItem: []
    });
  };

  //
  setIsComingRowBool = (row: [{ id: string, amount: number }]) =>
    row
      .map(cell => this.state.comingItem.some((col: string) => col === cell.id))
      .some((col: boolean) => col);

  render() {
    return (
      <div>
        <button className="elemCreate" onClick={this.initState}>
          click
        </button>
        <table>
          <tbody>
            {this.state.matrix.map(
              (row: [{ id: string, amount: number }], i: number) => (
                <Row
                  key={i}
                  row={i === this.state.indexSum ? this.state.percentRow : row}
                  onClickElem={this.counter}
                  sumRow={this.state.sumRow[i]}
                  comingItem={this.state.comingItem}
                  getComingItem={this.getComingItem}
                  getPercentRow={this.getPercentRow}
                  rowIndex={i}
                  percentRow={this.state.percentRow}
                  //bool
                  isComingRowBool={this.setIsComingRowBool(row)}
                  clearStateComing={this.clearStateComing}
                  clearStateIndexSumRow={this.clearStateIndexSumRow}
                />
              )
            )}
            {this.state.averageCol.length !== 0 ? (
              <Row classAverageCol="sumColumn" row={this.state.averageCol} />
            ) : null}
          </tbody>
        </table>
      </div>
    );
  }
}