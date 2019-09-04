import React from "react";
import Cell from "./Cell";

const Row = ({ row, sumRow, classAverageCol, counter, getComingItems, comingItems, clearStateComing }) => {
  const updateCurCounter = cur => counter(cur);
  const updateCurComing = cur => (getComingItems ? getComingItems(cur) : null);

  return (
    <tr>
      {row.map((col, colI) => (
        <Cell
          isComingCell={comingItems? comingItems.some((id)=>col.id===id):false}
          cellValue={col}
          clearStateComing={clearStateComing}
          updateCurComing={updateCurComing}
          updateCurCounter={updateCurCounter}
          classAverageCol={classAverageCol}
          col={col.amount || col}
        />
      ))}
      {sumRow !== undefined && sumRow.length !== 0 ? (
        <Cell col={sumRow} classSumRow="sumRow" />
      ) : null}
    </tr>
  );
};

export default Row;
