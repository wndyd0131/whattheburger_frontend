import { useState, createContext, useContext, useReducer } from "react";
import { MenuCreateContext } from "../../../pages/MenuCreate";
import Modal from "../../Modal";
import SearchBar from "./SearchBar";
import SortSection from "./SortSection";
import OptionItemSection from "./OptionItemSection";
import SelectedOptionSection from "./SelectedOptionSection";
import DecisionFooter from "./DecisionFooter";
import OptionDetailModal from "../OptionDetailModal/OptionDetailModal";
import { ACTIONS } from "../../../pages/MenuCreate";

export const SelectedOptionContext = createContext();

const OptionModal = () => {
  
  const {
    selectedOptionState,
    selectedOptionDispatch,
  } = useContext(MenuCreateContext);

  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [selectedOptionTraitIdx, setSelectedOptionTraitIdx] = useState(null);

  const [formData, setFormData] = useState({
    isDefault: false,
    defaultQuantity: 1,
    maxQuantity: 1,
    extraPrice: 0,
    orderIndex: 0,
    countType: "SINGLE",
    measureType: "",
    measureValue: "",
    defaultSelection: 0,
    optionTraitId: null,
    optionTraitExtraPrice: 0,
    optionTraitExtraCalories: 0
  });

  const optionModalStyle = {
    height: 850,
    width: 1400,
    flexDirection: "column"
  }

  return (
    <SelectedOptionContext.Provider value={{
      selectedOptionState: selectedOptionState,
      selectedOptionDispatch: selectedOptionDispatch,
      selectedOptionIdx: selectedOptionIdx,
      selectedOptionTraitIdx: selectedOptionTraitIdx,
      setSelectedOptionIdx: setSelectedOptionIdx,
      setSelectedOptionTraitIdx: setSelectedOptionTraitIdx,
      formData: formData,
      setFormData: setFormData,
    }}>
      <Modal
        height={optionModalStyle.height}
        width={optionModalStyle.width}
        flexDirection={optionModalStyle.flexDirection}
      >
      {selectedOptionIdx !== null && 
        <OptionDetailModal/>
      }
      <div className="flex flex-col flex-grow">
        <SearchBar/>
        <SortSection/>
        <OptionItemSection/>
        <SelectedOptionSection/>
        <DecisionFooter/>
      </div>
    </Modal>
  </SelectedOptionContext.Provider>
  )
}

export default OptionModal;