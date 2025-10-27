import React from 'react'
import ImageContainer from './ImageContainer';
import ContentContainer from './ContentContainer';

const OrderSummaryList = ({productList}) => {
  return (
    <div className="flex flex-col basis-10/12 overflow-auto">
      {productList.map((product, productIdx) => {
        return (
          <div key={productIdx} className="flex outline-1 outline-gray-200">
            <ImageContainer image={product.imageSource}/>
            <ContentContainer product={product}/>
          </div>
        );
      })}
    </div>
  )
}

export default OrderSummaryList