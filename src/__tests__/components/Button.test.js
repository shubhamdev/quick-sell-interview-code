import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import pretty from "pretty";

import Button from "../../components/Button/";

describe("Test Button Component", () => {
  const handleClick = jest.fn();
  it("renders button component", () => {
    const { container } = render(
      <Button
        label="hello"
        width={60}
        height={56}
        borderWidth="0 0 0 1px"
        onClick={handleClick}
      />
    );
    const buttonElement = screen.getByText(/hello/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle({
      width: "60px",
      height: "56px",
      borderWidth: "0 0 0 1px",
      cursor: "pointer",
    });
    userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("renders disabled button component", () => {
    const { container } = render(
      <Button
        label="world"
        width={60}
        height={56}
        borderWidth="0 0 0 1px"
        disabled
        onClick={handleClick}
      />
    );
    const buttonElement = screen.getByText(/world/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveStyle({
      width: "60px",
      height: "56px",
      borderWidth: "0 0 0 1px",
      cursor: "auto",
    });
    userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(0);

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("renders default button component", () => {
    const { container } = render(<Button />);
    const buttonElement = screen.getAllByRole(/button/i)[0];
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle({
      width: "60px",
      height: "100%",
      borderWidth: 1,
      cursor: "pointer",
    });
    userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(0);

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
