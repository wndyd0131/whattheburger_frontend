const ToggleSwitch = ({
  value,
  setter
}) => {
  return (
    <div 
      className={`relative w-[42px] h-[25px] rounded-[30px] border-1 border-gray-300 cursor-pointer transition-colors duration-500 ease-in-out ${value === 0 ? "" : "bg-orange-400"}`}
      onClick={() => setter(value)}
    >
      <div className={`absolute rounded-full w-[23px] h-[23px] bg-gray-200 transition-transform duration-200 ease-in-out ${value === 0 ? "translate-x-0" : "translate-x-[17px]"}`}></div>
    </div>
  );
}

export default ToggleSwitch;