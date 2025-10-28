
const OptionSummary = ({customRuleList, productPrice, extraPrice}) => {
  return (
    <div>
      {customRuleList.map((customRule, customRuleIdx) => {
        return (
          <span key={customRuleIdx} className="flex flex-col">
            {customRule.optionList.length > 0 &&
             <strong>{customRule.customRuleName}: </strong>
            }
            <ul>
              {customRule.optionList
                .map((option, optionIdx) => {
                  const quantity = option.quantity;
                  const quantityDetail = option.quantityDetail;
                  const quantityHtml = quantityDetail
                  ? <UncountableLabel quantityType={quantityDetail.quantityType}/>
                  : <span>(x{quantity})</span>
                  // const optionCountString = option.countType === "COUNTABLE" ? 'x' + option.optionQuantity : measureString;
                  const traitHtml = 
                    <ul>
                      {
                        option.traitList.map((trait, traitIdx) => {
                          return (
                            <li key={traitIdx} className="flex justify-between">
                              <p>{trait.traitName + ' ' + trait.selectedValue}</p>
                              <p>{trait.calculatedPrice.toFixed(2)}</p>
                            </li>
                          )
                        })
                      }
                    </ul>
                  return (
                    <li key={optionIdx}>
                      <div className="flex justify-between">
                        <p className='flex gap-x-1 items-center'>{option.optionName}{quantityHtml}</p>
                        <p className={`${option.calculatedPrice > 0 ? "font-bold" : ""}`}>{option.calculatedPrice.toFixed(2)}</p>
                        
                      </div>
                      {traitHtml}
                    </li>
                  );
                }
              )}
            </ul>
          </span>
        );
      }
      )}
      <span className='flex border-t-1 mt-2'></span>
      <div className='flex mt-2 justify-between'>
        <p>Total</p>
        <p><strong>{extraPrice.toFixed(2)}</strong></p>
      </div>
    </div>
  )
}

export default OptionSummary;