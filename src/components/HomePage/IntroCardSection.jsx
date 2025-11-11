
const IntroCardSection = () => {
  return (
    <div className="grid text-md grid-rows-3 w-full font-[sans-serif]
      sm:text-lg
      md:text-xl
      xl:text-2xl
    ">
      <div className="grid grid-cols-1 items-center
      sm:grid-cols-2
      ">
        <div className="flex flex-col gap-3 p-10 order-1 sm:order-0">
          <h1 className="text-[#FE7800]">Earn your point and take rewards</h1>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
        </div>
        <div className="overflow-hidden w-full h-full order-0 sm:order-1">
          <img className="w-full h-full object-cover sm:rounded-r-2xl" src="/images/banner3.png"></img>
        </div>
      </div>
      <div className="grid grid-cols-1 items-center
        sm:grid-cols-2
      ">
        <div className="w-full h-full overflow-hidden
          sm:rounded-l-2xl
        ">
          <img className="w-[full] h-full object-cover" src="/images/banner1.png"></img>
        </div>
        <div className="flex flex-col gap-3 p-10">
          <h1 className="text-[#FE7800]">Join our team</h1>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
        </div>
      </div>
      <div className="grid grid-cols-1 items-center
        sm:grid-cols-2
      ">
        <div className="flex flex-col gap-3 p-10 order-1 sm:order-0">
          <h1 className="text-[#FE7800]">Purchase gift card</h1>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
        </div>
        <div className="w-full h-full overflow-hidden order-0 sm:order-1
          sm:rounded-r-2xl
        ">
          <img className="w-full h-full object-cover" src="/images/banner2.png"></img>
        </div>
      </div>
    </div>
  )
}

export default IntroCardSection