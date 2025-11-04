
const UncountableLabel = ({quantityType}) => {
  switch(quantityType) {
    case 'Easy': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(86,193,220)]">Easy</span>
      );
    }
    case 'Extra': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Extra</span>
      );
    }
    case 'Kids': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-sky-300">Kids</span>
      );
    }
    case 'Small': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-yellow-300">Small</span>
      );
    }
    case 'Medium': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-orange-400">Medium</span>
      );
    }
    case 'Large': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Large</span>
      );
    }
  }
}

export default UncountableLabel;