import {
  CREATE_MATRIX,
  CHANGE_VALUE_M,
  CHANGE_VALUE_N,
  CHANGE_VALUE_X,
  EXECUTE_SUM_ROW,
  EXECUTE_AVERAGE_COL,
  COUNTER_MATRIX,
  EXECUTE_COMING_ITEMS,
  CLEAR_STATE_MATRIX,
  EXECUTE_PERCENT_ROW
} from "../action/constActions";
import reduceReducers from "reduce-reducers";

const initState = {
  matrix: [],
  sumRow: [],
  m: 7,
  n: 5,
  x: 7,
  averageCol: [],
  comingItems: [],
  percentRow: [],
  rowIndex: null
};

const initMatrix = (state = initState, { type, matrix }) => {
  if (type === CREATE_MATRIX) {
    return { ...state, matrix };
  } else {
    return state;
  }
};

const setCounterValue = (state, { type, cell }) => {
  if (type === COUNTER_MATRIX) {
    return {
      ...state,
      matrix: state.matrix.map(row =>
        row.map(col =>
          col.id === cell.id ? { ...col, amount: col.amount + 1 } : col
        )
      )
    };
  } else {
    return state;
  }
};

const setValueM = (state, { type, m }) => {
  if (type === CHANGE_VALUE_M) {
    return { ...state, m };
  } else {
    return state;
  }
};

const setValueN = (state, { type, n }) => {
  if (type === CHANGE_VALUE_N) {
    return { ...state, n };
  } else {
    return state;
  }
};

const setValueX = (state, { type, x }) => {
  if (type === CHANGE_VALUE_X) {
    return { ...state, x };
  } else {
    return state;
  }
};

const setSumRow = (state, { type }) => {
  if (type === EXECUTE_SUM_ROW) {
    return {
      ...state,
      sumRow: state.matrix.map((item: []) =>
        item.reduce((acc, cur: { id: string, amount: number }) => {
          return acc + cur.amount;
        }, 0)
      )
    };
  } else return state;
};

const setAverageCol = (state, { type }) => {
  if (type === EXECUTE_AVERAGE_COL) {
    return {
      ...state,
      averageCol: state.matrix
        .flatMap(it => it)
        .reduce(
          (acc, item: { id: string, amount: number }, i) => (
            (acc[i % state.matrix[0].length] += item.amount), acc
          ),
          Array.apply(0, Array(state.matrix[0].length)).map(() => 0)
        )
        .map((item: { id: string, amount: number }) =>
          Math.floor(item / state.n)
        )
    };
  } else {
    return state;
  }
};

const setComingItems = (state, { type, cell }) => {
  if (type === EXECUTE_COMING_ITEMS) {
    return {
      ...state,
      comingItems: Array.from(
        state.matrix.flatMap((cell: { id: string, amount: number }) => cell)
      )
        .sort(
          (
            a: { id: string, amount: number },
            b: { id: string, amount: number }
          ) =>
            Math.abs(cell.amount - a.amount) - Math.abs(cell.amount - b.amount)
        )
        .slice(0, Number(state.x) + 1)
        .map((elem: {}) => {
          return elem.id;
        })
    };
  } else {
    return state;
  }
};

const clearState = (state, { type }) => {
  if (type === CLEAR_STATE_MATRIX) {
    return {
      ...state,
      comingItems: [],
      rowIndex: null
    };
  } else {
    return state;
  }
};

const setPercentRow = (state, { type, col, rowIndex }) => {
  if (type === EXECUTE_PERCENT_ROW) {
    return { ...state, percentRow: state.matrix[rowIndex].map(cell =>
          parseFloat((cell.amount * 100) / col).toFixed(1)
      ), rowIndex: rowIndex}
  } else {
    return state;
  }
};

const allReducers = reduceReducers(
  initState,
  initMatrix,
  setSumRow,
  setValueM,
  setValueN,
  setValueX,
  setAverageCol,
  setCounterValue,
  setComingItems,
  clearState,
  setPercentRow
);

// const allReducers = combineReducers({
//   initMatrix,
//   setValueM,
//   setValueN,
//   setSumRow,
//   setAverageCol,
//   setCounterValue
// });

export default allReducers;
