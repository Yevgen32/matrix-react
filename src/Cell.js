//@flow
import React, { Component } from "react";

type Props = {
  backgroundStyle: { background: string } | null,
  cellObject: { id: string, amount: number },
  classAverageCol: string,
  clearStateComing: {} | void,
  col: number,
  currentValue: {} | void,
  isComingBool: boolean,
  updateIndex: {} | void,
  onClickElem: [],
  rowIndex: number,
  clearState: {} | void,
  onClickElem: void,
  rowIndex: number,
  classSum: string,
  clearStateIndexSumRow: {} | void
};

export default class Cell extends Component<Props> {
  shouldComponentUpdate(nextProps: { col: number, isComingBool: boolean }) {
    if (this.props.col !== nextProps.col) {
      return true;
    }
    if (this.props.isComingBool !== nextProps.isComingBool) {
      return true;
    }
    return false;
  }

  hoverElem = () => {
    if (this.props.rowIndex !== undefined) {
      this.props.updateIndexSum(this.props.rowIndex);
    }
    if (
      this.props.currentValue !== undefined &&
      this.props.cellObject.id !== undefined
    ) {
      this.props.currentValue(this.props.cellObject);
    }
  };

  mouseLeave = () => {
    if (this.props.clearStateComing !== undefined) {
      this.props.clearStateComing();
    }
    if (this.props.clearState !== undefined) {
      this.props.clearState();
    }
    if (this.props.clearStateIndexSumRow !== undefined) {
      this.props.clearStateIndexSumRow();
    }
  };

  render() {
    const {
      col,
      cellObject,
      isComingBool,
      backgroundStyle,
      classAverageCol
    } = this.props;
    return col !== undefined ? (
      <td
        onMouseOver={this.hoverElem}
        onClick={
          this.props.cellObject !== undefined &&
          this.props.onClickElem !== undefined
            ? () => this.props.onClickElem(cellObject)
            : null
        }
        className={
          isComingBool
            ? "comingItemStyle"
            : this.props.classSum || classAverageCol || "matrixCellElem"
        }
        style={backgroundStyle}
        onMouseLeave={this.mouseLeave}
      >
        {/*{console.log("CELL!!!")}*/}
        {col}
      </td>
    ) : null;
  }
}
