import React from 'react'

const OptionSummary = () => {
  return (
    <div className="flex flex-col">
      {cart.customRules.map((customRule, customRuleIdx) => {
        const optionString = customRule.productOptions
          .filter(option => option.isSelected)
          .map(option => {
            let measureString = "";
            if (option.measureType) {
              switch (option.measureType) {
                case "SIZE": {
                  switch (option.optionQuantity) {
                    case 0:
                      measureString = "Kids";
                    case 1:
                      measureString = "Small";
                    case 2:
                      measureString = "Medium";
                    case 3:
                      measureString = "Large";
                  }
                }
                case "DEGREE": {
                  switch (option.optionQuantity) {
                    case 0:
                      measureString = "Easy";
                    case 1:
                      measureString = "Regular";
                    case 2:
                      measureString = "Extra";
                  }
                }
              }
            }

            const optionCountString = option.countType === "COUNTABLE" ? 'x' + option.optionQuantity : measureString;
            const optionTraitString = option.productOptionTraits
              .filter(trait => trait.optionTraitType === "BINARY" && trait.currentValue === 1)
              .map(trait => '(' + trait.labelCode + ')')
              .join('');
            return option.optionName + ' ' + '(' + optionCountString + ')' + (optionTraitString.length > 0 ? ' ' + optionTraitString : '');
          }
        ).join(', ');
        return (
          <span key={customRuleIdx} className="flex flex-col">
          <strong>{customRule.customRuleName}: </strong>
          <span className="text-gray-500 text-sm italic">{optionString.length < 1 ? "N/A" : optionString}</span>
          </span>
        );
      }
      )}
    </div>
  )
}

export default OptionSummary;