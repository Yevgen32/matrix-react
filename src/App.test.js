import React from "react";
import TestUtils from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { mockRandom } from "jest-mock-random";
import App from "./App";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
describe("snapshot", () => {
  const component = TestUtils.renderIntoDocument(<App />);
  const buttonCreate = TestUtils.findRenderedDOMComponentWithTag(
    component,
    "button"
  );
  TestUtils.Simulate.click(buttonCreate);
  const TestRender = renderer.create(<App />);

  it("test#1 button is", () => {
    expect(TestUtils.isDOMComponent(buttonCreate)).toBe(true);
  });
  it("test#2 function create matrix", () => {
    mockRandom(0.0001, 0.0002, 0.0003);
    // TestRender.getInstance().initState();
    expect(TestRender.getInstance().createMatrix(10, 10)).toMatchSnapshot();
  });
  it("test#3 sum row", () => {
    mockRandom(0.0001, 0.0002, 0.0003);
    // TestRender.getInstance().initState();
    const matrix = TestRender.getInstance().createMatrix(20, 20);
    expect(TestRender.getInstance().getSumRow(matrix)).toMatchSnapshot();
  });
  it("test#4 average column", () => {
    mockRandom(0.0001, 0.0002, 0.0003);
    // TestRender.getInstance().initState();
    const matrix = TestRender.getInstance().createMatrix(20, 20);
    expect(TestRender.getInstance().getAverageCol(matrix)).toMatchSnapshot();
  });
  it("test#5 percent row", () => {
    mockRandom(0.0001, 0.0002, 0.0003);
    // TestRender.getInstance().initState();
    const matrix = TestRender.getInstance().createMatrix(20, 20);
    const sumRow = TestRender.getInstance().getAverageCol(matrix);
    expect(
      TestRender.getInstance().percentMatrix(matrix, sumRow)
    ).toMatchSnapshot();
  });

  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
  // it('test# ', () => {
  //
  // });
});
