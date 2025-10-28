import React from 'react'

const IntroCardSection = () => {
  return (
    <>
      <div className="flex max-h-[450px] max-w-[1200px] rounded-r-4xl overflow-hidden font-[normal]">
        <div className="flex justify-start items-center basis-1/2 p-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-[#FE7800]">Earn your point and take rewards</h1>
            <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
          </div>
        </div>
        <div className="basis-1/2">
          <img src="src/assets/images/banner3.png"></img>
        </div>
      </div>
      <div className="flex max-h-[450px] max-w-[1200px] rounded-l-4xl overflow-hidden font-[normal]">
        <div className="basis-1/2">
          <img src="src/assets/images/banner1.png"></img>
        </div>
        <div className="flex justify-start items-center basis-1/2 p-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-[#FE7800]">Join our team</h1>
            <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
          </div>
        </div>
      </div>
      <div className="flex max-h-[450px] max-w-[1200px] rounded-r-4xl overflow-hidden font-[normal]">
        <div className="flex justify-start items-center basis-1/2 p-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-[#FE7800]">Purchase gift card</h1>
            <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
          </div>
        </div>
        <div className="basis-1/2">
          <img src="src/assets/images/banner2.png"></img>
        </div>
      </div>
    </>
  )
}

export default IntroCardSection