import { useState, createContext, useContext, useReducer } from "react";
import { MenuContext } from "../../../pages/MenuCreate";
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
  } = useContext(MenuContext);

  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [selectedOptionTraitIdx, setSelectedOptionTraitIdx] = useState(null);

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
      setSelectedOptionTraitIdx: setSelectedOptionTraitIdx
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