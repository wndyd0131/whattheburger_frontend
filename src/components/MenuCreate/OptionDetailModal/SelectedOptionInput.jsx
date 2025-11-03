import OptionSection from './OptionSection';
import OptionTraitSection from './OptionTraitSection';
import OptionDetailFooter from './OptionDetailFooter';
import QuantitySection from './QuantitySection';
import CommonSection from './CommonSection';

const SelectedOptionInput = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row min-h-0 flex-grow">
        <OptionSection/>
        <QuantitySection/>
        <OptionTraitSection/>
      </div>
      <CommonSection/>
      <OptionDetailFooter/>
    </div>
  );
}

export default SelectedOptionInput;