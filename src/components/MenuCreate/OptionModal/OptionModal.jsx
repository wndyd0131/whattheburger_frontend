import { createContext, useContext, useReducer } from "react";
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

  const selectedOptionReducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.ADD_OPTION:
        const elementId = action.payload.elementId;
        const option = action.payload.option;
        const exists = state.find(selectedOption => selectedOption.elementId === elementId);
        const nextIdx = state.length;

        if (exists) {
          return state.filter(
            selectedOption => selectedOption.elementId !== elementId
          );
        }
        else {
          const newOption = {
            elementId: elementId,
            option: option,
            isDefault: false,
            defaultQuantity: 1,
            maxQuantity: 1,
            extraPrice: 0,
            orderIndex: nextIdx,
            measureTypeButton: "SINGLE"
          }
          return [...state, newOption];
        }
      case ACTIONS.SAVE_OPTION:
        const optionDetail = action.payload.optionDetail;
        const optionTraitDetail = action.payload.optionTraitDetail;

        return state.map(((selectedOption, selectedOptionIdx) => 
          selectedOptionIdx === action.payload.selectedOptionIdx 
            ? {
              ...selectedOption,
              isDefault: optionDetail.isDefault,
              defaultQuantity: optionDetail.defaultQuantity,
              maxQuantity: optionDetail.maxQuantity,
              extraPrice: optionDetail.extraPrice,
              orderIndex: optionDetail.orderIndex,
              measureTypeButton: optionDetail.measureTypeButton,
              measureType: optionDetail.measureType,
              measureValue: optionDetail.measureValue,
              optionTrait: optionTraitDetail
            }
            : selectedOption
        ));
      default:
        return state;
    }
  }

  const [selectedOptionState, selectedOptionDispatch] = useReducer(selectedOptionReducer, []);

  const {
    selectedOptionIdx
  } = useContext(MenuContext);

  const optionModalStyle = {
    height: 850,
    width: 1400,
    flexDirection: "column"
  }

  return (
    <SelectedOptionContext.Provider value={{
      selectedOptionState: selectedOptionState,
      selectedOptionDispatch: selectedOptionDispatch
    }}>
      <Modal
        height={optionModalStyle.height}
        width={optionModalStyle.width}
        flexDirection={optionModalStyle.flexDirection}
      >
      {selectedOptionIdx !== "" && 
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