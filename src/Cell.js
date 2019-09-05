import React from "react";

const Cell = ({
  col,
  classSumRow,
  classAverageCol,
  cellValue,
  updateCurCounter,
  updateCurComing,
  isComingCell,
  clearStateComing,
  getIndexRow,
  rowI,
  clearStateRowPercent,
  changeBackgroundPercent
}) => {
  const hover = () => {
    if (updateCurComing && cellValue) {
      updateCurComing(cellValue);
    }
    if (getIndexRow && !cellValue) {
      getIndexRow(rowI);
    }
    // else if (!updateCurComing) {
    //     clearStateComing()
    // }
  };

  const leaveCurson = () => {
    if (clearStateComing !== undefined) {
      clearStateComing();
    }
    if (clearStateRowPercent !== undefined) {
      clearStateRowPercent();
    }
  };

  return (
    <td
      onClick={
        cellValue !== undefined ? () => updateCurCounter(cellValue) : null
      }
      onMouseEnter={hover}
      onMouseLeave={leaveCurson}
      style={changeBackgroundPercent}
      className={
        isComingCell
          ? "comingItemStyle"
          : classSumRow || classAverageCol || "matrixCellElem"
      }
    >
      {col}
    </td>
  );
};

const cellEqual = (prevProps, nextProps) => {
  if (prevProps.col !== nextProps.col) {
    return false;
  }
  if (prevProps.isComingCell !== nextProps.isComingCell) {
    return false;
  }
  return true;
};

export default React.memo(Cell, cellEqual);
