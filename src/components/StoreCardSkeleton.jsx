import React from 'react'

const StoreCardSkeleton = () => {
  return (
    <div
      className="flex flex-col p-3 rounded-2xl shadow-md w-full pointer-events-none border-gray-300 select-none animate-pulse"
    >
      <header>
        <h3 className="h-8 w-50 bg-gray-200 rounded"></h3>
      </header>
      <address className='mt-2 h-6 w-100 bg-gray-200 rounded'></address>
      <dl className="grid grid-rows-2 grid-cols-4 gap-y-2 gap-x-5 py-2 text-sm">
        <dt className="text-gray-500">
          Address
        </dt>
        <dd>
          <div className='h-15 bg-gray-200 rounded'></div>
        </dd>
        <dt className="text-gray-500">
          Open Time
        </dt>
        <dd>
          <div className='h-4 bg-gray-200 rounded'></div>
        </dd>
        <dt className="text-gray-500">
          Contact
        </dt>
        <dd>
          <div className='h-4 bg-gray-200 rounded'></div>
        </dd>
        <dt className="text-gray-500">
          Operator
        </dt>
        <dd>
          <div className='h-4 bg-gray-200 rounded'></div>
        </dd>
      </dl>
      <div className="flex justify-end text-gray-500">
          <div className='h-4 bg-gray-200 w-24 rounded'></div>
      </div>
    </div>
  )
}

export default StoreCardSkeleton;