// @flow
import React, { Component } from "react";
import Cell from "./Cell";

type Props = {
  getComingItem: {} | void,
  comingItem: [],
  rowIndex: number,
  row: [],
  sumRow: number,
  changeBackgroundStyle: {} | void,
  percentRow: [],
  isComingRowBool: boolean,
  onClickElem: void,
  clearStateComing: void,
  clearStateIndexSumRow: void,
  classAverageCol: void
};

export default class Row extends Component<Props> {
  shouldComponentUpdate(nextProps: {
    sumRow: number,
    row: [{ id: number, amount: number } | number],
    rowIndex: number,
    isComingRowBool: boolean
  }) {
    if (this.props.sumRow !== nextProps.sumRow) {
      return true;
    }
    if (this.props.row !== nextProps.row) {
      return true;
    }
    if (this.props.rowIndex !== nextProps.rowIndex) {
      return true;
    }
    if (this.props.isComingRowBool !== nextProps.isComingRowBool) {
      return true;
    }
    return false;
  }

  updateIndexSum = (index: number) => this.props.getPercentRow(index);

  getCurrentValue = (cur: {}) => this.props.getComingItem(cur);

  changeBackgroundStyle: { background: number } | void = (j: number) => {
    if (
      this.props.percentRow !== undefined &&
      this.props.percentRow.length !== 0
    ) {
      return {
        background:
          ("linear-gradient(white ": string) +
          (100 - this.props.percentRow[j]) +
          ("%, yellow ": string) +
          this.props.percentRow[j] +
          ("%)": string),
        fontWeight: "bold"
      };
    } else {
      return null;
    }
  };

  render() {
    const {
      row,
      sumRow,
      comingItem,
      onClickElem,
      rowIndex,
      clearStateComing,
      clearStateIndexSumRow,
      classAverageCol
    } = this.props;
    return (
      <tr>
        {/*{console.log("row")}*/}
        {row.map((col: number & { id: string, amount: number }, j) => (
          <Cell
            currentValue={this.getCurrentValue}
            backgroundStyle={this.changeBackgroundStyle(j)}
            key={col.id || j}
            onClickElem={onClickElem}
            cellObject={col}
            col={(col.amount: number) || col}
            isComingBool={
              comingItem !== undefined
                ? comingItem.some((item: string) => item === col.id)
                : null
            }
            classAverageCol={classAverageCol}
            clearStateComing={clearStateComing}
          />
        ))}
        {
          <Cell
            clearStateIndexSumRow={clearStateIndexSumRow}
            classSum="sumRow"
            col={sumRow}
            updateIndexSum={this.updateIndexSum}
            rowIndex={rowIndex}
          />
        }
      </tr>
    );
  }
}

// const Row = React.memo(
//   ({ row, sumRow, comingItems, indexRow, isPercent, percentRow }) => {
//     const changeBackgroundStyle = j => {
//       if (percentRow !== undefined && isPercent && percentRow.length !== 0) {
//         return {
//           background:
//             ("linear-gradient(white ": string) +
//             (100 - percentRow[j]) +
//             ("%, yellow ": string) +
//             percentRow[j] +
//             ("%)": string),
//           fontWeight: "bold"
//         };
//       } else {
//         return null;
//       }
//     };
//
//     return (
//       <tr>
//         {(isPercent && percentRow !== undefined && percentRow.length > 0
//           ? percentRow
//           : row
//         ).map((col, colI) => (
//           <Cell
//             key={col.id}
//             // colI={colI}
//             cellId={col.id}
//             changeBackgroundStyle={changeBackgroundStyle(colI)}
//             // percentRow={percentRow !== undefined ? percentRow[colI]: []}
//             col={col.amount || col}
//             isComingBool={
//               comingItems !== undefined
//                 ? comingItems.some((id: string) => id === col.id)
//                 : null
//             }
//           />
//         ))}
//         {console.log('row---')}
//         {<Cell indexRow={indexRow} classSum="sumRow" col={sumRow} />}
//       </tr>
//     );
//   },(prevProps, nextProps)=> {
//         // console.log('!    ', prevProps);
//         // console.log(nextProps, '             !');
//         if (prevProps.isPercent !== nextProps.isPercent) {
//             return false;
//         }
//         if(prevProps.indexRow !== nextProps.indexRow) {
//             return false
//         }
//         if(prevProps.row !== nextProps.row){
//             return false
//         }
//         // if (prevProps.comingItems !== nextProps.comingItems){
//         //     return false
//         // }
//         return true;
//     }
// );
