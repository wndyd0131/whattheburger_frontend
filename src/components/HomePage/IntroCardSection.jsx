const IntroCardSection = () => {
  return (
    <div className="grid text-md w-full max-w-6xl mx-auto font-[sans-serif] px-4 py-8 sm:px-6 sm:py-12 bg-amber-100 rounded-2xl overflow-hidden
      sm:text-lg
      md:text-xl
      xl:text-2xl
    ">
      <div className="grid grid-cols-1 items-center
        sm:grid-cols-2
      ">
        <div className="flex flex-col gap-3 p-6 sm:p-8 md:p-10 order-1 sm:order-0">
          <h2 className="text-[#FE7800] text-xl sm:text-2xl md:text-3xl font-semibold">Earn your point and take rewards</h2>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
        </div>
        <div className="overflow-hidden w-full h-full order-0 sm:order-1">
          <img className="w-full h-full max-h-[250px] sm:max-h-none object-cover sm:rounded-r-2xl" src="/images/banner3.png" alt="Rewards program" />
        </div>
      </div>
      <div className="grid grid-cols-1 items-center
        sm:grid-cols-2
      ">
        <div className="w-full h-full overflow-hidden">
          <img className="w-full h-full max-h-[250px] sm:max-h-none object-cover sm:rounded-l-2xl" src="/images/banner1.png" alt="Join our team" />
        </div>
        <div className="flex flex-col gap-3 p-6 sm:p-8 md:p-10">
          <h2 className="text-[#FE7800] text-xl sm:text-2xl md:text-3xl font-semibold">Join our team</h2>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
        </div>
      </div>
      <div className="grid grid-cols-1 items-center
        sm:grid-cols-2
      ">
        <div className="flex flex-col gap-3 p-6 sm:p-8 md:p-10 order-1 sm:order-0">
          <h2 className="text-[#FE7800] text-xl sm:text-2xl md:text-3xl font-semibold">Purchase gift card</h2>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti at laboriosam eligendi maxime ad mollitia eum enim libero cum. Architecto enim minus rerum officia animi id porro non eveniet fugiat!</p>
        </div>
        <div className="w-full h-full overflow-hidden order-0 sm:order-1">
          <img className="w-full h-full max-h-[250px] sm:max-h-none object-cover sm:rounded-r-2xl" src="/images/banner2.png" alt="Gift cards" />
        </div>
      </div>
    </div>
  )
}

export default IntroCardSection