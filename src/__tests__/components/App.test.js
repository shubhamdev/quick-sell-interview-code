import { render } from "@testing-library/react";
import pretty from "pretty";

import App from "../../App";

test("renders app", () => {
  const { container } = render(<App />);

  expect(container).toBeInTheDocument();

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
