import { useContext, useState } from "react";
import { SelectedOptionContext } from "../OptionModal/OptionModal";
import { MenuCreateContext } from "../../../pages/MenuCreate";
import Modal from "../../Modal";
import QuantityDetailModal from "./QuantityDetailModal";

const QuantitySection = () => {

  const {
    formData,
    setFormData,
    selectedOptionState,
    selectedOptionIdx
  } = useContext(SelectedOptionContext);

  const [selectedQuantityId, setSelectedQuantityId] = useState(null);

  const handleClickQuantityItem = (quantityId, quantitySelected) => {
    setSelectedQuantityId(quantityId);
  }

  console.log("OPTIONS", selectedOptionState);
  console.log("OPTION_ID", selectedOptionIdx);
  console.log("FORMDATA", formData);

  return (
    <div className="flex flex-col min-h-0 flex-grow">
      <div className="flex-col overflow-y-auto divide-y divide-gray-300">
        {selectedOptionIdx !== null && 0 <= selectedOptionIdx && selectedOptionIdx < selectedOptionState.length &&
          formData.quantityDetails.map((quantityDetail, quantityDetailIdx) => {
            const quantityId = quantityDetail.id;
            const quantityName = quantityDetail.quantityType;
            const quantitySelected = quantityDetail.isSelected === true;
            const regularClassName = "flex bg-amber-50 justify-center items-center h-[50px] cursor-pointer hover:bg-amber-100";
            const selectedClassName = "flex bg-amber-100 justify-center items-center h-[50px] cursor-pointer hover:bg-amber-200";
            return (
              <div 
                key={quantityDetailIdx}
                className={quantitySelected ? selectedClassName : regularClassName}
                onClick={() => handleClickQuantityItem(quantityId, quantitySelected)}
              >
                {quantityName}
              </div>
            );
        })}
      </div>
      {selectedQuantityId !== null &&
        <QuantityDetailModal selectedQuantityId={selectedQuantityId} setSelectedQuantityId={setSelectedQuantityId}/>
      }
    </div>
  );
}

export default QuantitySection;
