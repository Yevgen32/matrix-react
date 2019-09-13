import {
  CREATE_MATRIX,
  COUNTER_MATRIX,
  CHANGE_VALUE_M,
  CHANGE_VALUE_N,
  CHANGE_VALUE_X,
  EXECUTE_SUM_ROW,
  EXECUTE_AVERAGE_COL,
  EXECUTE_COMING_ITEMS,
  CLEAR_STATE_MATRIX,
  EXECUTE_PERCENT_ROW
} from "./constActions";

export const createMatrixAction = matrix => ({
  type: CREATE_MATRIX,
  matrix
});

export const getMatrixCounter = cell => ({
  type: COUNTER_MATRIX,
  cell
});

export const getValueM = m => ({
  type: CHANGE_VALUE_M,
  m
});

export const getValueN = n => ({
  type: CHANGE_VALUE_N,
  n
});
export const getValueX = x => ({
  type: CHANGE_VALUE_X,
  x
});

export const getSumRowAction = () => ({
  type: EXECUTE_SUM_ROW,
});

export const getAverageColAction = () => ({
  type: EXECUTE_AVERAGE_COL,
});

export const getComingItems = cell => ({
  type: EXECUTE_COMING_ITEMS,
  cell
});

export const clearStateComing = () => ({
  type: CLEAR_STATE_MATRIX
});

export const getRowPercent = (col, rowIndex) => ({
  type: EXECUTE_PERCENT_ROW,
  col,
  rowIndex
});