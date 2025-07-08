import React from 'react'

const LeftImageCard = ({props}) => {
  return (
    <div className="flex max-h-[450px] max-w-[1200px] rounded-l-4xl overflow-hidden font-[normal]">
      <div className="image-container basis-1/2">
        <img src={props.imageSource}></img>
      </div>
      <div className="message-container flex justify-start items-center basis-1/2 p-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-[#FE7800]">{props.title}</h1>
          <p className="text-lg text-gray-600">{props.content}</p>
        </div>
      </div>
    </div>
  )
}

export default LeftImageCard