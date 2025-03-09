const MenuImageContainer = ({width, height, imgSrc}) => {
  return (
    <div className="menu-image-container" style={{width, height}}>
      <img src={imgSrc}></img>
    </div>
  );
}

export default MenuImageContainer;