// import React from "react";
//
// const Cell = ({
//   col,
//   classSumRow,
//   classAverageCol,
//   cellValue,
//   updateCurCounter,
//   updateCurComing,
//   isComingCell,
//   clearStateComing,
//   getIndexRow,
//   rowI,
//   clearStateRowPercent,
//   changeBackgroundPercent
// }) => {
//   const hover = () => {
//     if (updateCurComing !== undefined && cellValue) {
//       updateCurComing(cellValue);
//     }
//     if (rowI !== undefined) {
//       getIndexRow(rowI);
//     }
//   };
//
//   const leaveCurson = () => {
//     if (clearStateComing !== undefined) {
//       clearStateComing();
//     }
//     if (clearStateRowPercent !== undefined) {
//       clearStateRowPercent();
//     }
//   };
//
//   return (
//     <td
//       onClick={
//         cellValue !== undefined ? () => updateCurCounter(cellValue) : null
//       }
//       onMouseOver={hover}
//       onMouseOut={leaveCurson}
//       style={changeBackgroundPercent}
//       className={
//         isComingCell
//           ? "comingItemStyle"
//           : classSumRow || classAverageCol || "matrixCellElem"
//       }
//     >
//       {col}
//     </td>
//   );
// };
//
// const cellEqual = (prevProps, nextProps) => {
//   if (prevProps.col !== nextProps.col) {
//     return false;
//   }
//   if (prevProps.isComingCell !== nextProps.isComingCell) {
//     return false;
//   }
//   return true;
// };
//
// export default React.memo(Cell, cellEqual);

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatrixCounter,
  getSumRowAction,
  getAverageColAction,
  getComingItems,
  clearStateComing,
  getRowPercent
} from "../action/index";
//
const Cell = ({
  col,
  percentStyle,
  classSumRow,
  classAverageCol,
  cellValue,
  isComingCell,
  rowIndex
}) => {
  const dispatch = useDispatch();
  const handleClickCounter = () => {
    if (cellValue !== undefined && typeof cellValue !== "number") {
      dispatch(getMatrixCounter(cellValue));
      dispatch(getSumRowAction());
      dispatch(getAverageColAction());
      dispatch(getComingItems(cellValue));
    }
  };

  const handleOverMatrix = () => {
    if (cellValue !== undefined && typeof cellValue !== "number") {
      dispatch(getComingItems(cellValue));
    } else if (rowIndex !== undefined) {
      dispatch(getRowPercent(col, rowIndex));
    }
  };

  const handleOutMatrix = () => {
    if (typeof cellValue !== "number") {
      dispatch(clearStateComing());
    }
  };

  return col !== undefined ? (
    <td
      style={percentStyle}
      onMouseOver={handleOverMatrix}
      onMouseOut={handleOutMatrix}
      onClick={handleClickCounter}
      className={
        isComingCell
          ? "comingItemStyle"
          : classSumRow || classAverageCol || "matrixCellElem"
      }
    >
      {col}
    </td>
  ) : null;
};
export default Cell;
