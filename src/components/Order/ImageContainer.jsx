import React from 'react'

const ImageContainer = ({image}) => {
  return (
    <div className="flex justify-center items-center min-w-[200px] max-w-[250px]">
      <img className="" src={image}/>
    </div>
  )
}

export default ImageContainer;