import React from 'react'

const MenuCardSkeleton = () => {
  return (
    <div
      className="flex flex-col rounded-2xl shadow-lg hover:shadow-2xl transition-all w-full duration-300 overflow-hidden border group pointer-events-none border-gray-300 select-none animate-pulse"
    >
      <div className="relative overflow-hidden">
        <div className="w-[300px] h-[200px]"></div>
        <div className="absolute inset-0 bg-gray-200"></div>
      </div>
      
      <div className="flex flex-col p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="text-xl font-bold h-10 w-35 bg-gray-200 text-gray-800 font-['Whatthefont'] rounded-xl">
          </div>
          <div className="flex flex-col gap-y-3 items-end">
            <span className="h-3 w-10 bg-gray-200 rounded-xl">
            </span>
            <span className="h-3 w-10 bg-gray-200 rounded-xl">
            </span>
          </div>
        </div>
        <div className='w-full rounded-xl bg-gray-200 h-20'>

        </div>
        
        <div className="py-7 px-6 w-full rounded-xl bg-gray-200">
          
        </div>
      </div>
    </div>
  );
}

export default MenuCardSkeleton