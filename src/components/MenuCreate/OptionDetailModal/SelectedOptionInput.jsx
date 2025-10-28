
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