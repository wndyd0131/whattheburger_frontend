import React from 'react'
import ProductSummary from './ProductSummary';
import OptionSummary from './OptionSummary';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ChargeSummary from './ChargeSummary';

const ContentContainer = ({product}) => {
  const productQuantity = product.quantity;
  const productPrice = product.calculatedPrice;
  const extraPrice = product.extraPrice;
  const productTotalPrice = product.calculatedPrice * productQuantity;
  const productId = product.productId;
  return (
      <div className="flex flex-col p-2 h-full w-full">
        <div className="flex items-center gap-3 font-['Whatthefont']">
          <h3 className="text-[#FE7800]">{product.productName}</h3>
          <div className="flex justify-center items-center p-3 max-w-[100px] h-[20px] rounded-[20px] text-[18px] text-white bg-[#FE7800]">
            {product.productType}
          </div>
        </div>
        <Accordion>
          <AccordionSummary
            id="panel1-header"
          >
            <Typography component="span">Selected options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <OptionSummary
              customRuleList={product.customRuleList}
              productPrice={productPrice}
              extraPrice={extraPrice}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
        >
          <AccordionSummary
            id="panel1-header"
          >
            <Typography component="span">Total Charge</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ChargeSummary product={product}/>
          </AccordionDetails>
        </Accordion>
      </div>
  )
}

export default ContentContainer;