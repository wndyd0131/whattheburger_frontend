import { useContext } from "react";
import { OptionContext } from "./OrderModal/contexts/OptionContext";
import CountableModifier from "./CountableModifier";
import UncountableModifier from "./UncountableModifier";

const CountModifier = () => {

  const {
    option,
  } = useContext(OptionContext);

  switch(option.countType) {
    case "COUNTABLE": {
      if (option.maxQuantity !== 1) {
        return (
          <CountableModifier/>
        );
      }
      else {
        return <></>;
      }
    }
    case "UNCOUNTABLE": {
      return (
        <UncountableModifier/>
      );
    }
    default:
      return(
        <>
        </>
      );
  }
}

export default CountModifier;