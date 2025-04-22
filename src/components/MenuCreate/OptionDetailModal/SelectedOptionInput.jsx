import OptionSection from './OptionSection';
import OptionTraitSection from './OptionTraitSection';
import OptionDetailFooter from './OptionDetailFooter';

const SelectedOptionInput = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row min-h-0 flex-grow">
        <OptionSection/>
        <OptionTraitSection/>
      </div>
      <OptionDetailFooter/>
    </div>
  );
}

export default SelectedOptionInput;