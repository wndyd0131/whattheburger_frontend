const MenuImageContainer = ({width, height, imgSrc}) => {
  return (
    <div className="flex justify-center items-center overflow-hidden" style={{width, height}}>
      <img src={imgSrc}></img>
    </div>
  );
}

export default MenuImageContainer;