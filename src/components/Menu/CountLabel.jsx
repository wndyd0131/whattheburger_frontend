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
      if (optionDetail.measureType === 'DEGREE') {
        if (optionDetail.optionQuantity === 0) {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(86,193,220)]">Easy</div>
          );
        } else if (optionDetail.optionQuantity === 1) {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[#FE7800]">Regular</div>
          );
        } else {
          return (
            <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Extra</div>
          );
        }
      }
      else if (optionDetail.measureType === 'SIZE') {
        //
      }
    }
    default:
      return <></>;
  }
}

export default CountLabel;