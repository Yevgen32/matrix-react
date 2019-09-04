import React from "react";

const Cell = ({
  col,
  classSumRow,
  classAverageCol,
  cellValue,
  updateCurCounter,
  updateCurComing,
  isComingCell,
  clearStateComing
}) => {
  const hover = () => {
    if (updateCurComing) {
      updateCurComing(cellValue);
    } else if (!updateCurComing) {
        clearStateComing()
    }
  };

  return (
    <td
      onClick={() => updateCurCounter(cellValue)}
      onMouseEnter={hover}
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

export default Cell;
