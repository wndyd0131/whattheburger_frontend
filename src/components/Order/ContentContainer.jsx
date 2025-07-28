import React from 'react'
import ProductSummary from './ProductSummary';
import OptionSummary from './OptionSummary';

const ContentContainer = () => {
  return (
    <div className="flex flex-col p-2 h-full w-full">
      <ProductSummary/>
      {/* <OptionSummary/> */}
    </div>
  )
}

export default ContentContainer;