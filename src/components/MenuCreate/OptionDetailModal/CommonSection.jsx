import React, { useContext } from 'react'
import { SelectedOptionContext } from '../OptionModal/OptionModal';

const CommonSection = () => {
  const {
    formData,
    setFormData
  } = useContext(SelectedOptionContext);

  const isDefault = formData.isDefault;

  return (
    <div className="flex p-3 justify-center border-t border-[rgb(225,225,225)]">
      <label htmlFor="isDefaultInput">default:</label>
      <input
        id="isDefaultInput"
        type="checkbox"
        checked={isDefault}
        className=""
        onChange={
          (e) => setFormData(prev => ({...prev, isDefault: e.target.checked}))
        }
      />
    </div>
  )
}

export default CommonSection;