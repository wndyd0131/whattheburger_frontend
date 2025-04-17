import { useContext } from "react";
import { MenuContext } from "../../../pages/MenuCreate";

const SelectedOptionSection = () => {

  const {
    selectedOptions,
    setSelectedOptionIdx
  } = useContext(MenuContext);

  const handleClickCustomButton = (optionIdx) => {
    setSelectedOptionIdx(optionIdx);
  }

  const handleClickDeleteButton = (optionIdx) => {
    setSelectedOptions(prev => prev.filter((_, idx) => optionIdx !== idx));
  }

  return (
    <div className="flex items-center h-[250px] bg-[rgb(244,244,244)] overflow-x-auto px-[40px] gap-[20px]">
    {selectedOptions.map((option, optionIdx) => {
      return (
        <div key={optionIdx} className="flex flex-col border-1 border-[rgb(225,225,225)] min-w-[300px] min-h-[150px]">
          <div className="flex justify-center items-center flex-grow">
            <div className="w-[80px]">
            </div>
            <div className="flex flex-col items-center flex-grow">
              <p>{option.item.optionName}</p>
              <p>{option.item.optionCalories} Cal</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-[60px] border-t-1 border-[rgb(225,225,225)] gap-[30px]">
            <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickCustomButton(optionIdx)}>Custom</button>
            <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickDeleteButton(optionIdx)}>Delete</button>
          </div>
        </div>
      );

    })}
  </div>
  );
}

export default SelectedOptionSection;