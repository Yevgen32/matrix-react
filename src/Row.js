import React, { useState } from "react";
import Cell from "./Cell";

const Row = ({
  row,
  rowI,
  sumRow,
  classAverageCol,
  counter,
  getComingItems,
  comingItems,
  clearStateComing
}) => {
  const [percentRow, setPercentRow] = useState([]);
  const [nowIndex, setNowIndex] = useState(null);

  const updateCurCounter = cur => counter(cur);
  const updateCurComing = cur => (getComingItems ? getComingItems(cur) : null);

  const getPercentRow = indexSum => {
    const percentRowFunction = row.map(cell =>
      parseFloat((cell.amount * 100) / sumRow).toFixed(1)
    );
    setPercentRow(percentRowFunction);
    setNowIndex(indexSum);
  };

  const clearStateRowPercent = () => {
    setNowIndex(null);
  };

  const changeBackgroundPercent = j => {
    if (rowI === nowIndex) {
      return {
        background:
          ("linear-gradient(white ": string) +
          (100 - percentRow[j]) +
          ("%, yellow ": string) +
          percentRow[j] +
          ("%)": string),
        fontWeight: "bold"
      };
    } else {
      return null;
    }
  };

  return (
    <tr>
      {(rowI === nowIndex ? percentRow : row).map((col, colI) => (
        <Cell
          isComingCell={
            comingItems ? comingItems.some(id => col.id === id) : false
          }
          key={col.id}
          cellValue={col}
          clearStateComing={clearStateComing}
          updateCurComing={updateCurComing}
          updateCurCounter={updateCurCounter}
          changeBackgroundPercent={changeBackgroundPercent(colI)}
          classAverageCol={classAverageCol}
          col={col.amount || col}
        />
      ))}
      {sumRow !== undefined && sumRow.length !== 0 ? (
        <Cell
          col={sumRow}
          getPercentRow={getPercentRow}
          clearStateRowPercent={clearStateRowPercent}
          rowI={rowI}
          classSumRow="sumRow"
        />
      ) : null}
    </tr>
  );
};

const rowEqual = (prevProps, nextProps) => {
  if (prevProps.row !== nextProps.row) {
    return false;
  }
  if (prevProps.rowI !== nextProps.rowI) {
    return false;
  }
  if (prevProps.sumRow !== nextProps.sumRow) {
    return false;
  }
  if (prevProps.setIsComingRowBool !== nextProps.setIsComingRowBool) {
    return false;
  }
  return true;
};

export default React.memo(Row, rowEqual);
