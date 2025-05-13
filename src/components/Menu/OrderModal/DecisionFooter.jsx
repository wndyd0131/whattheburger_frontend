const DecisionFooter = () => {
  return (
    <div className="flex basis-1/6 justify-center items-center gap-[20px] border-t-1 border-[gray]">
      <div className="flex justify-center items-center bg-[#FE7800] rounded-[5px] w-[170px] h-[50px] text-[21px] whitespace-nowrap cursor-pointer">Order</div>
      <div className="flex justify-center items-center bg-[#FE7800] rounded-[5px] w-[170px] h-[50px] text-[21px] whitespace-nowrap cursor-pointer">Add To Bag</div>
    </div>
  );
}

export default DecisionFooter;