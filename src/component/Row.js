// import React from "react";
// import Cell from "./Cell";
//
// const Row = ({
//   row,
//   rowI,
//   sumRow,
//   classAverageCol,
//   counter,
//   getComingItems,
//   comingItems,
//   clearStateComing,
//   getPercentRow,
//   isComingRow,
//   clearStateRowPercent,
//   percentRow
// }) => {
//   const updateCurCounter = cur => counter(cur);
//   const updateCurComing = cur => (getComingItems ? getComingItems(cur) : null);
//
//   const getIndexRow = indexSum => {
//     getPercentRow(indexSum);
//   };
//
//   const changeBackgroundPercent = j => {
//     if (percentRow !== undefined && percentRow.length !== 0) {
//       return {
//         background:
//           ("linear-gradient(white ": string) +
//           (100 - percentRow[j]) +
//           ("%, yellow ": string) +
//           percentRow[j] +
//           ("%)": string),
//         fontWeight: "bold"
//       };
//     } else {
//       return null;
//     }
//   };
//
//   return (
//     <tr>
//       {row.map((col, colI) => (
//         <Cell
//           isComingCell={
//             comingItems ? comingItems.some(id => col.id === id) : null
//           }
//           key={col.id || colI}
//           cellValue={col}
//           clearStateComing={clearStateComing}
//           updateCurComing={updateCurComing}
//           updateCurCounter={updateCurCounter}
//           changeBackgroundPercent={changeBackgroundPercent(colI)}
//           classAverageCol={classAverageCol}
//           col={col.amount || col}
//         />
//       ))}
//       {sumRow !== undefined && sumRow.length !== 0 ? (
//         <Cell
//           clearStateRowPercent={clearStateRowPercent}
//           key={"RowI_" + rowI}
//           col={sumRow}
//           getIndexRow={getIndexRow}
//           rowI={rowI}
//           classSumRow="sumRow"
//         />
//       ) : null}
//     </tr>
//   );
// };
//
// const rowEqual = (prevProps, nextProps) => {
//   if (prevProps.sumRow !== nextProps.sumRow) {
//     return false;
//   }
//   if (prevProps.row !== nextProps.row) {
//     return false;
//   }
//   if (prevProps.isComingRow !== nextProps.isComingRow) {
//     return false;
//   }
//   if (prevProps.rowI !== nextProps.rowI) {
//     return false;
//   }
//   return true;
// };
//
// export default React.memo(Row, rowEqual);

import React from "react";
import Cell from "./Cell";
import { useSelector } from "react-redux";

function Row({ row, classAverageCol, rowIndex, setIsComingRowBool }) {
  const sumRow = useSelector(state => state.sumRow);
  const comingItems = useSelector(state => state.comingItems);
  const nowIndex = useSelector(state => state.rowIndex);
  const percentRow = useSelector(state => state.percentRow);


  const changeBackgroundPercent = colIndex => {
    if (rowIndex===nowIndex) {
      return {
        background:
          ("linear-gradient(white ": string) +
          (100 - percentRow[colIndex]) +
          ("%, yellow ": string) +
          percentRow[colIndex] +
          ("%)": string),
        fontWeight: "bold"
      };
    } else {
      return null;
    }
  };
  
  return (
    <tr>
      {row.map((col, colIndex) => (
        <Cell
          isComingCell={
            comingItems ? comingItems.some(id => col.id === id) : null
          }
          percentStyle={changeBackgroundPercent(colIndex)}
          key={col.id || colIndex}
          classAverageCol={classAverageCol}
          cellValue={col}
          col={col.amount || col}
        />
      ))}
      {sumRow !== undefined && sumRow.length !== 0 ? (
        <Cell rowIndex={rowIndex} col={sumRow[rowIndex]} classSumRow="sumRow" />
      ) : null}
    </tr>
  );
}

export default Row;
