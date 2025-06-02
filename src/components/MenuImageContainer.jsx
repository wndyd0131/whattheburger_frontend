const MenuImageContainer = ({width, height, imgSrc}) => {
  return (
    <div className="flex justify-center items-center min-h-[150px] w-full overflow-hidden">
      <img src={imgSrc} style={{width, height}}></img>
    </div>
  );
}

export default MenuImageContainer;