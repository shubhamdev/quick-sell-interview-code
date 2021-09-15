import { number } from "prop-types";

import CounterComponent from "./CounterComponent";

const Counter = ({
  count = 1,
  max = 1000,
  handleDecrement = () => {},
  handleIncrement = () => {},
  onChange = () => {},
}) => {
  return (
    <CounterComponent
      value={count}
      max={max}
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
      onChange={onChange}
    />
  );
};

Counter.propTypes = {
  initialValue: number,
  max: number,
};

export default Counter;
