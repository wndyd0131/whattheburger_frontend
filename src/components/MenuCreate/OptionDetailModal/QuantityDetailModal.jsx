import { useContext, useState } from "react";
import { SelectedOptionContext } from "../OptionModal/OptionModal";

const QuantityDetailModal = ({selectedQuantityId, setSelectedQuantityId}) => {

  const {
    formData,
    setFormData,
  } = useContext(SelectedOptionContext);

  const [isDefault, setIsDefault] = useState(formData.quantityDetails.find(quantity => quantity.id === selectedQuantityId)?.isDefault);
  const [extraPrice, setExtraPrice] = useState(formData.quantityDetails.find(quantity => quantity.id === selectedQuantityId)?.extraPrice);

  const handleClickSaveButton = () => {
    const updatedQuantityDetails = formData.quantityDetails.map(quantity => 
      quantity.id === selectedQuantityId
      ? {
        ...quantity,
        isDefault: isDefault,
        extraPrice: extraPrice,
        isSelected: true
      }
      : quantity
    );
    setFormData(prev => ({
      ...prev,
      quantityDetails: updatedQuantityDetails
    }));
    setSelectedQuantityId(null);
  }

  const handleClickRemoveButton = () => {
    const updatedQuantityDetails = formData.quantityDetails.map(quantity => 
      quantity.id === selectedQuantityId
      ? {
        ...quantity,
        isDefault: false,
        extraPrice: 0,
        isSelected: false
      }
      : quantity
    );
    setFormData(prev => ({
      ...prev,
      quantityDetails: updatedQuantityDetails
    }));
    setSelectedQuantityId(null);
  }

  const handleClickCancelButton = () => {
    setSelectedQuantityId(null);
  }

  return (
    <Modal height={200} width={350} flexDirection="column">
      <div className="flex flex-col basis-3/5 justify-center items-center">
        <div className="grid grid-cols-[60px_1fr] gap-y-[20px]">
          <label htmlFor="isDefaultInput">is default:</label>
          <input
            className=""
            id="isDefaultInput"
            type="checkbox"
            checked={isDefault}
            onChange={
              () => setIsDefault(prev => !prev)
            }
            // onChange={
            //   (e) => setFormData(prev => ({...prev, isDefault: e.target.checked}))
            // }
          />
          <label htmlFor="extraPriceInput">extra price:</label>
          <input
            id="extraPriceInput"
            className="border border-gray-300 rounded px-4 py-2"
            type="number"
            value={extraPrice}
            onChange={
              (e) => setExtraPrice(e.target.value)
            }
            // onChange={
            //   (e) => setFormData(prev => ({...prev, extraPrice: e.target.value}))
            // }
          />
        </div>
      </div>
        <div className="flex basis-2/5 justify-center items-center h-[70px] border-t-1 border-[rgb(225,225,225)] gap-[50px]">
          <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickSaveButton()}>Save</button>
          <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickRemoveButton()}>Delete</button>
          <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickCancelButton()}>Cancel</button>
        </div>
    </Modal>
  );
}

export default QuantityDetailModal;