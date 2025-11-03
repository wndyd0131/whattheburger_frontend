import { useContext } from "react";
import { MenuCreateContext } from "/src/components/Admin/MenuCreate";
import ToggleSwitch from "../../ToggleSwitch";
import { SelectedOptionContext } from "../OptionModal/OptionModal";

const OptionTraitSection = () => {

  const {
    optionTraits,
  } = useContext(MenuCreateContext);

  const {
    selectedOptionState,
    selectedOptionIdx,
    selectedOptionTraitIdx,
    setSelectedOptionTraitIdx,
    formData,
    setFormData,
  } = useContext(SelectedOptionContext);

  const defaultSelection = formData.defaultSelection;

  const handleClickOptionTraitButton = (optionTraitIdx) => {
    if (optionTraitIdx === selectedOptionTraitIdx) {
      setSelectedOptionTraitIdx(null);
      setFormData({
        ...formData,
        defaultSelection: null,
      });
    }
    else {
      setSelectedOptionTraitIdx(optionTraitIdx);
      const elementId = selectedOptionState[selectedOptionIdx]?.optionTrait.elementId;
      if (elementId === optionTraitIdx) {
        const defaultSelection = selectedOptionState[selectedOptionIdx]?.optionTrait.defaultSelection;
        setFormData({
          ...formData,
          defaultSelection: defaultSelection
        });
      }
      else {
        setFormData({
          ...formData,
          defaultSelection: 0,
        });
      }
    }
  }

  const handleClickToggleSwitch = (value) => {
    value === 0
    ? setFormData({...formData, defaultSelection: 1})
    : setFormData({...formData, defaultSelection: 0});
  }

  return (
    <>
      <div className="flex flex-col min-h-0 flex-grow">
        <div className="selectedOptionTraitHeader">
          
        </div>
        <div className="flex-col overflow-y-auto divide-y divide-gray-300">
          {optionTraits.map((optionTrait, optionTraitIdx) => {
            const regularClassName = "flex bg-amber-50 justify-center items-center h-[50px] cursor-pointer hover:bg-amber-100";
            const selectedClassName = "flex bg-amber-100 justify-center items-center h-[50px] cursor-pointer hover:bg-amber-200";
            return (
              <div 
                key={optionTraitIdx}
                className={optionTraitIdx === selectedOptionTraitIdx ? selectedClassName : regularClassName}
                onClick={() => handleClickOptionTraitButton(optionTraitIdx)}
              >
                {optionTrait.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-col h-full w-[300px]">
        <div className="h-1/6 w-full flex justify-center items-center">
          Trait Information
        </div>
        {
          selectedOptionTraitIdx !== null && optionTraits[selectedOptionTraitIdx]?.optionTraitType === 'BINARY' ?
          <div className="h-3/6 w-full flex-col justify-items-center content-center">
            <ToggleSwitch value={defaultSelection} setter={handleClickToggleSwitch}/>
            <p>Default: {defaultSelection === 0 ? "false" : "true"}</p>
          </div>
          :
          ""
        }
        <div className="h-2/6 w-full flex justify-center items-center">
          <input/>
          <input/>
        </div>
      </div>
    </>
  );
}

export default OptionTraitSection;