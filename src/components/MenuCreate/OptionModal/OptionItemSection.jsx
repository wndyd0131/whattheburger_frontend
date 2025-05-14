import { useContext } from "react";
import { MenuCreateContext } from "../../../pages/MenuCreate";
import { SelectedOptionContext } from "./OptionModal";
import { ACTIONS } from "../../../reducers/MenuCreate/actions";

const OptionItemSection = () => {
  const {
    options
  } = useContext(MenuCreateContext);

  const {
    selectedOptionState,
    selectedOptionDispatch
  } = useContext(SelectedOptionContext)

  const handleClickOptionGrid = (optionIdx, exists) => {
    if (exists) {
      selectedOptionDispatch({
        type: ACTIONS.DELETE_OPTION,
        payload: {
          optionIdx: optionIdx,
          deleteMethod: "grid"
        }
      });
    }
    else {
      selectedOptionDispatch({
        type: ACTIONS.ADD_OPTION,
        payload: {
          elementId: optionIdx,
          option: options[optionIdx]
        }
      })
    }
  }

  return (
    <div className="flex flex-grow px-[20px] py-[30px]">
      <div className="grid grid-cols-4 gap-x-[20px] gap-y-[10px] overflow-y-auto h-[350px] w-full p-[10px]">
        {options.map((option, optionIdx) => {
          const exists = selectedOptionState.find(item => item.elementId === optionIdx);
          return (
            <div key={optionIdx}
              className={`flex justify-self-center w-[300px] h-[100px] cursor-pointer hover:bg-[rgb(224,224,224)] hover:transition duration-200 ${exists ? "border-1 border-[#FE7800]" : "border-1 border-[rgb(225,225,225)]"}`}
              onClick={() => handleClickOptionGrid(optionIdx, exists)}
            >
              <div className="w-[80px]">
              </div>
              <div className="flex flex-col items-center flex-grow">
                <p>{option.optionName}</p>
                <p>{option.optionCalories} Cal</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OptionItemSection;