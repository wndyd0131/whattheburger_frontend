import React from 'react'
import { CloseButton, RightArrowIcon } from '../../svg/Utils'

const Header = () => {
  return (
    <div className="flex relative justify-center items-center basis-1/12 w-full border-b-1 border-gray-200">
      <div className="absolute left-2 cursor-pointer">
        <RightArrowIcon color="#FE7800" width={40} height={40}/>
      </div>
      <h1 className="font-['Whatthefont']">Cart</h1>
    </div>
  )
}

export default Header