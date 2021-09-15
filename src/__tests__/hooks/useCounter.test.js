import { renderHook, act } from "@testing-library/react-hooks";

import useCounter from "../../hooks/useCounter";

describe("Test suite for useCounter", () => {
  it("With initial value 1 and max 1000", () => {
    const initialValue = 1;
    const max = 1000;
    const { result } = renderHook(() =>
      useCounter({ count: initialValue, max })
    );
    let [state, dispatch] = result.current;

    expect(state.count).toBe(initialValue);
    expect(state.max).toBe(max);

    act(() => {
      dispatch({ type: "increment" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(initialValue+1);

    act(() => {
      dispatch({ type: "increment" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(initialValue+2);

    act(() => {
      dispatch({ type: "decrement" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(initialValue+1);

    act(() => {
      dispatch({ type: "absolute", value: "500" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(500);

    act(() => {
      dispatch({ type: "absolute", value: "5000" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(500);

    act(() => {
      dispatch({ type: "absolute", value: "1000" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(1000);

    act(() => {
      dispatch({ type: "increment" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(1000);

    act(() => {
      dispatch({ type: "decrement" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(999);

    act(() => {
      dispatch({ type: "other" });
    });
    state = result.current[0];
    
    expect(state.count).toBe(999);
  });
});
