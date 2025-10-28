
const UncountableLabel = ({quantityType}) => {
  switch(quantityType) {
    case 'Easy': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(86,193,220)]">Easy</span>
      );
    }
    // case 'Regular': {
    //   return (
    //     <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[#FE7800]">Regular</span>
    //   );
    // }
    case 'Extra': {
      return (
        <span className="flex justify-center items-center p-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Extra</span>
      );
    }
  }
}

export default UncountableLabel;