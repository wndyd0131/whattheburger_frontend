const MenuImageContainer = ({width, height, imgSrc}) => {
  return (
    <div className="flex justify-center items-center w-full h-full overflow-hidden bg-gray-50">
      <img 
        src={imgSrc} 
        style={{width, height}} 
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        alt="Menu item"
      />
    </div>
  );
}

export default MenuImageContainer;