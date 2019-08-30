// @flow
import React, { Component } from "react";
import Row from "./Row.js";
import "./App.css";

type Props = {}

type State = {
    m: number,
    n: number,
    x: number,
    matrix: [],
    sumRow: [],
    averageCol: [],
    comingItem: []
}

export default class App extends Component<Props, State> {



  state = {
    m: 10,
    n: 7,
    x: 3,
    matrix: [],
    sumRow: [],
    averageCol: [],
    comingItem: []
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

  getSumRow = (matrix: []): [] =>
    matrix.map((item: []) =>
      item.reduce((acc, cur: { id: string, amount: number }) => {
        return acc + cur.amount;
      }, 0)
    );

  getAverageCol = (matrix: []): [] =>
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

  counter = (cur: { id: string, amount: number }): [] => {
    const counterMatrix = this.state.matrix.map((row: []) =>
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



  getComingItem = (cur: {id: string, amount: number}) => {
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
      .map((elem:{}) => elem.id)

    this.setState({
      comingItem: comingItem
    });
  };

  clearStateComing = () => {
      this.setState({
          comingItem: []
      })
  };

  render() {
    return (
      <div>
        <button className="elemCreate" onClick={this.initState}>
          click
        </button>
        <table>
          <tbody>
            {this.state.matrix.map((row:[], i) => (
              <Row
                matrix={this.state.matrix}
                getComingItem={this.getComingItem}
                comingItem={this.state.comingItem}
                rowIndex={i}
                key={i}
                onClickElem={this.counter}
                row={row}
                sumRow={this.state.sumRow[i]}
                clearStateComing={this.clearStateComing}
              />
            ))}
            {this.state.averageCol.length !== 0 ? (
              <Row row={this.state.averageCol} />
            ) : null}
          </tbody>
        </table>
      </div>
    );
  }
}
