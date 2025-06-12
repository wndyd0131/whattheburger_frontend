import React, { useState } from 'react'
import { TrashCanIcon } from '../../svg/Utils'

const Footer = () => {

  const [trashCanIconHovered, setTrashCanIconHovered] = useState(false);
  return (
    <div className="flex relative justify-center items-center basis-1/12 w-full gap-10">
      <button className="flex justify-center items-center border-1 bg-white text-[#FE7800] border-[#FE7800] font-['Whatthefont'] rounded-[5px] w-[170px] h-[50px] text-[21px] whitespace-nowrap cursor-pointer hover:bg-[#FE7800] hover:text-white hover:border-white">
        Order
      </button>
      <button
        className="flex absolute right-5 justify-center items-center border-1 bg-white text-[#FE7800] border-[#FE7800] font-['Whatthefont'] w-[40px] h-[40px] rounded-full whitespace-nowrap cursor-pointer hover:bg-[#FE7800] hover:text-white hover:border-white"
        onMouseEnter={() => setTrashCanIconHovered(true)}
        onMouseLeave={() => setTrashCanIconHovered(false)}  
      >
        <TrashCanIcon width={30} height={30} color={trashCanIconHovered ? "#FFFFFF" : "#FE7800"}/>
      </button>
    </div>
  )
}

export default Footer