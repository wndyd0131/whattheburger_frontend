import { useContext } from "react";
import { OptionContext } from "./OrderModal/contexts/OptionContext";
import { Slider, ThemeProvider } from "@mui/material";
import  { createTheme } from "@mui/material";
import { OPTION_ACTIONS } from "../../reducers/Option/actions";
import { LayoutContext } from "../../contexts/LayoutContext";
const UncountableModifier = () => {

  const theme = createTheme({
    palette: {
      orange: {
        main: '#FE7800',
        light: '#F90000'
      }
    }, typography: {
      fontFamily: 'sans-serif',
    }
  });
  
  const {
    reducer: {
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const {
    customRuleIdx,
    option
  } = useContext(OptionContext);

  const handleClickSlider = (value, customRuleIdx, option) => {
    const modifyType = "DISCRETE";
    dispatchRoot({
      type: OPTION_ACTIONS.MODIFY_QUANTITY,
      payload: {
        customRuleIdx: customRuleIdx,
        optionId: option.optionId,
        modifyType: modifyType,
        index: value
      }
    })
  }
// [kids, small]
// [medium, large]
// [small, medium, large]
// [kids, small, medium, large]
  const quantityDetail = option.quantityDetail;
  const quantityDetailList = option.quantityDetail.quantityList;
  
  const marks = quantityDetailList.map((quantity, quantityIdx) => {
    const quantityType = quantity.quantityType;
    const classNameString = quantity.extraPrice === 0
    ? ""
    : quantity.extraPrice > 0 ? "text-red-700" : "text-green-700"
    ;
    const quantityValue = quantity.extraPrice === 0
      ? "$0"
      : quantity.extraPrice > 0 ? "+$" + quantity.extraPrice : "-" + quantity.extraPrice.toString().replace("-", "$")
      ;
    return (
      {
        value: quantityIdx,
        label: 
          <div className="flex flex-col justify-center items-center">
            <p>{quantityType}</p>
            <p className={classNameString}>{quantityValue}</p>
          </div>
      }
    );
  });

  return (
    <div className="flex justify-center items-center w-[150px]">
      {option.isSelected &&
      <ThemeProvider theme={theme}>
        <Slider
          aria-label="Degree"
          defaultValue={option.defaultQuantity}
          shiftStep={30}
          step={1}
          min={0}
          max={quantityDetailList.length - 1}
          marks={marks}
          disabled={!option.isSelected}
          value={quantityDetail.selectedIdx}
          onChange={(_, value) => handleClickSlider(value, customRuleIdx, option)}
          color="orange"
        />
      </ThemeProvider>
      }
    </div>
  )
}

export default UncountableModifier;