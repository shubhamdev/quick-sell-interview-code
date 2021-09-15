import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import pretty from "pretty";

import Counter from "../../components/Counter";
import CounterComponent from "../../components/Counter/CounterComponent";

describe("Test Counter Component", () => {
  const handleIncrement = jest.fn();
  const handleDecrement = jest.fn();
  const onChange = jest.fn();

  it("renders default Counter component", () => {
    const { container } = render(<Counter />);
    const counterComponent = document.querySelector(".counter");
    expect(counterComponent).toBeInTheDocument();
    expect(counterComponent).toHaveClass("counter");

    const decrementButton = screen.getByText(/-/i);
    expect(decrementButton).toBeInTheDocument();
    userEvent.click(decrementButton);
    expect(handleDecrement).toHaveBeenCalledTimes(0);

    const incrementButton = screen.getByText(/\+/i);
    expect(incrementButton).toBeInTheDocument();
    userEvent.click(incrementButton);
    expect(handleIncrement).toHaveBeenCalledTimes(0);

    const inputElement = screen.getByLabelText(/Count/gi);
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, {
      target: { value: "100" },
    });
    expect(onChange).toHaveBeenCalledTimes(0);

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("renders Counter component with handlers", () => {
    const { container } = render(
      <CounterComponent
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        onChange={onChange}
      />
    );
    const counterComponent = document.querySelector(".counter");
    expect(counterComponent).toBeInTheDocument();
    expect(counterComponent).toHaveClass("counter");

    const decrementButton = screen.getByText(/-/i);
    expect(decrementButton).toBeInTheDocument();
    userEvent.click(decrementButton);
    expect(handleDecrement).toHaveBeenCalledTimes(1);

    const incrementButton = screen.getByText(/\+/i);
    expect(incrementButton).toBeInTheDocument();
    userEvent.click(incrementButton);
    expect(handleIncrement).toHaveBeenCalledTimes(1);

    const inputElement = screen.getByLabelText(/Count/gi);
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, {
      target: { value: "100" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
