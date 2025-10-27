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
      if (selectedQuantity.labelCode === "EZ") {
        return (
          <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(86,193,220)]">Easy</div>
        );
      } else if (selectedQuantity.labelCode === "EX") {
        return (
          <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Extra</div>
        );
      }
      return null;
    }
    default:
      return <></>;
  }
}

export default CountLabel;