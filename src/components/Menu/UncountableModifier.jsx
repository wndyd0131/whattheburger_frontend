import { useContext } from "react";
import { OptionContext } from "./OrderModal/contexts/OptionContext";
import { Slider, ThemeProvider } from "@mui/material";
import  { createTheme } from "@mui/material";
import { ACTIONS } from "../../reducers/Option/actions";

const UncountableModifier = () => {

  const theme = createTheme({
    palette: {
      orange: {
        main: '#FE7800',
        light: '#F90000'
      }
    }
  });
  
  const {
    customRuleIdx,
    option,
    dispatchRoot
  } = useContext(OptionContext);

  const handleClickSlider = (value, customRuleIdx, option) => {
    const modifyType = "DISCRETE";
    dispatchRoot({
      type: ACTIONS.MODIFY_QUANTITY,
      payload: {
        customRuleIdx: customRuleIdx,
        productOptionId: option.productOptionId,
        modifyType: modifyType,
        value: value
      }
    })
  }

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
          max={2}
          marks={[{value: 0, label: "Easy"}, {value: 1, label: "Regular"}, {value: 2, label: "Extra"}]}
          disabled={!option.isSelected}
          value={option.optionQuantity}
          onChange={(event, value) => handleClickSlider(value, customRuleIdx, option)}
          color="orange"
        />
      </ThemeProvider>
      }
    </div>
  )
}

export default UncountableModifier;