import MenuImageContainer from "../MenuImageContainer";

const MenuBox = ({name, imgSrc, description, calories, setModalOpened}) => {
  return (
    <div className="menu-grid-box">
      <MenuImageContainer width="100%" height="220px" imgSrc={imgSrc}/>
      <div className="menu-info-container">
        <div className="menu-info-box">
          <h2>{name}</h2>
          <p>{description}</p>
          <h3>{calories} cals</h3>
        </div>
      </div>
      <div className="menu-order-box">
        <a>
          <div className="intermediate-order-button" onClick={setModalOpened}>
            Start Order
          </div>
        </a>
      </div>
    </div>
  );
}

export default MenuBox;