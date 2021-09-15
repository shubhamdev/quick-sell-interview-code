import { number, func } from "prop-types";

import Button from "../Button";
import "./styles.css";

const CounterComponent = ({
  value = 1,
  max = 1000,
  handleDecrement = () => {},
  handleIncrement = () => {},
  onChange = () => {},
}) => (
  <div className="counter">
    <Button
      label="-"
      width={60}
      height={56}
      color="primary"
      backgroundColor="tertiary"
      borderWidth="0 1px 0 0"
      borderColor="primary"
      onClick={handleDecrement}
    />
    <input
      type="number"
      className="count-input"
      aria-label="Count"
      value={value}
      max={max}
      onChange={onChange}
    />
    <Button
      label="+"
      width={60}
      height={56}
      color="tertiary"
      backgroundColor="primary"
      borderWidth="0 0 0 1px"
      borderColor="primary"
      disabled={value === max}
      onClick={handleIncrement}
    />
  </div>
);

CounterComponent.propTypes = {
  value: number,
  max: number,
  handleDecrement: func,
  handleIncrement: func,
  onChange: func,
};

export default CounterComponent;
