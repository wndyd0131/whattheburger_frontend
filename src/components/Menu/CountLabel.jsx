const CountLabel = ({customRuleIdx, optionDetail, optionDetailIdx}) => {
  const countType = optionDetail.countType;
  switch(countType) {
    case 'COUNTABLE': {
      return (
        <div>
          {optionDetail.optionQuantity > 1 ? `(x${optionDetail.optionQuantity})` : ""}
        </div>
      );
    }
    case 'UNCOUNTABLE': {
      const selectedIdx = optionDetail.quantityDetail.selectedIdx;
      const selectedQuantity = optionDetail.quantityDetail.quantityList[selectedIdx];
      switch(selectedQuantity.labelCode) {
        case "EZ": {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(86,193,220)]">Easy</div>
          );
        }
        case "EX": {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Extra</div>
          )
        }
        case "K": {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-sky-300">Kids</div>
          )
        }
        case "S": {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-yellow-300">Small</div>
          )
        }
        case "M": {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-orange-400">Medium</div>
          )
        }
        case "L": {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Large</div>
          )
        }
        default: {
          return null;
        }
      }
    }
    default:
      return null;
  }
}

export default CountLabel;