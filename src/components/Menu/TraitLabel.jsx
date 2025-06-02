const TraitLabel = ({optionTrait}) => {
  return (
    <>
      {optionTrait.labelCode === 'TBS' && optionTrait.currentSelection === 1 ?
        <div className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(113,47,0)]">TBS</div> : <></>
      }
    </>
  );
}

export default TraitLabel;