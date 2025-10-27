import { useContext } from "react";
import { SelectedOptionContext } from "../OptionModal/OptionModal";
import CountableOptionSection from "./CountableOptionSection";
import UncountableOptionSection from "./UncountableOptionSection";

const OptionSection = () => {

  const DEFAULT_OPTION_STRING = "----Select----";

  const {
    selectedOptionState,
    selectedOptionIdx,
    formData,
    setFormData
  } = useContext(SelectedOptionContext);

  // const handleClickSingleButton = (e) => {
  //   const optionIdx = selectedOptionIdx;

  //   const isDefault = selectedOptionState[optionIdx].isDefault;
  //   const defaultQuantity = selectedOptionState[optionIdx].defaultQuantity;
  //   const maxQuantity = selectedOptionState[optionIdx].maxQuantity;
  //   const extraPrice = selectedOptionState[optionIdx].extraPrice;
  //   const orderIndex = selectedOptionState[optionIdx].orderIndex;

  //   if (selectedOptionState[optionIdx].countType === e.target.value) {
  //     setFormData(prev => ({...prev, isDefault: isDefault}));
  //     setFormData(prev => ({...prev, defaultQuantity: defaultQuantity}));
  //     setFormData(prev => ({...prev, maxQuantity: maxQuantity}));
  //     setFormData(prev => ({...prev, extraPrice: extraPrice}));
  //     setFormData(prev => ({...prev, orderIndex: orderIndex}));
  //   }
  //   else {
  //     setFormData(prev => ({...prev, isDefault: false}));
  //     setFormData(prev => ({...prev, defaultQuantity: 1}));
  //     setFormData(prev => ({...prev, maxQuantity: 1}));
  //     setFormData(prev => ({...prev, extraPrice: 0}));
  //   }
  //   setFormData(prev => ({...prev, countType: e.target.value}));
  // }

  const handleClickCountableButton = (e) => {
    const optionIdx = selectedOptionIdx;

    const isDefault = selectedOptionState[optionIdx].isDefault;
    const defaultQuantity = selectedOptionState[optionIdx].defaultQuantity;
    const maxQuantity = selectedOptionState[optionIdx].maxQuantity;
    const extraPrice = selectedOptionState[optionIdx].extraPrice;
    const orderIndex = selectedOptionState[optionIdx].orderIndex;

    if (selectedOptionState[optionIdx].countType === e.target.value) {
      setFormData(prev => ({...prev, isDefault: isDefault}));
      setFormData(prev => ({...prev, defaultQuantity: defaultQuantity}));
      setFormData(prev => ({...prev, maxQuantity: maxQuantity}));
      setFormData(prev => ({...prev, extraPrice: extraPrice}));
      setFormData(prev => ({...prev, orderIndex: orderIndex}));
    }
    else {
      setFormData(prev => ({...prev, isDefault: false}));
      setFormData(prev => ({...prev, defaultQuantity: 1}));
      setFormData(prev => ({...prev, maxQuantity: 1}));
      setFormData(prev => ({...prev, extraPrice: 0}));
    }
    setFormData(prev => ({...prev, countType: e.target.value}));
  }
 
  const handleClickUncountableButton = (e) => {
    const optionIdx = selectedOptionIdx;

    const isDefault = selectedOptionState[optionIdx].isDefault;
    const measureValue = selectedOptionState[optionIdx].measureValue;
    const extraPrice = selectedOptionState[optionIdx].extraPrice;
    const orderIndex = selectedOptionState[optionIdx].orderIndex;
    
    if (selectedOptionState[optionIdx].countType === e.target.value) {
      setFormData(prev => ({...prev, isDefault: isDefault}));
      setFormData(prev => ({...prev, measureValue: measureValue}));
      setFormData(prev => ({...prev, extraPrice: extraPrice}));
      setFormData(prev => ({...prev, orderIndex: orderIndex}));
    }
    else {
      setFormData(prev => ({...prev, isDefault: false}));
      setFormData(prev => ({...prev, measureValue: ""}));
      setFormData(prev => ({...prev, extraPrice: 0}));
    }
    setFormData(prev => ({...prev, countType: e.target.value}));
  }

  const countType = formData.countType;

  return (
    <div className="flex flex-col border-r-1 border-[rgb(225,225,225)] p-[20px]">
    <div className="flex justify-center items-center flex-grow">
      <div className="flex h-[50px] w-[300px] border border-[rgb(225,225,225)] rounded divide-x divide-gray-200">
        {/* <button className={`w-full ${formData.countType === "SINGLE" ? "opacity-50" : "hover:bg-gray-100"}`} value={"SINGLE"} onClick={(e) => handleClickSingleButton(e)} disabled={countType === "SINGLE"}>Single</button> */}
        <button className={`w-full ${formData.countType === "COUNTABLE" ? "opacity-50" : "hover:bg-gray-100"}`} value={"COUNTABLE"} onClick={(e) => handleClickCountableButton(e)} disabled={countType === "COUNTABLE"}>Countable</button>
        <button className={`w-full ${formData.countType === "UNCOUNTABLE" ? "opacity-50" : "hover:bg-gray-100"}`} value={"UNCOUNTABLE"} onClick={(e) => handleClickUncountableButton(e)} disabled={countType === "UNCOUNTABLE"}>Uncountable</button>
      </div>
    </div>
    <div className="flex flex-col justify-center items-center flex-grow">
    {/* {formData.countType === "SINGLE" && 
      <SingleOptionSection/>
    } */}
    {formData.countType === "COUNTABLE" &&
      <CountableOptionSection/>    
    }
    {formData.countType === "UNCOUNTABLE" && 
      <UncountableOptionSection/>
    }
    </div>
  </div>
  );
}

export default OptionSection;