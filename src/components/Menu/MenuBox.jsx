const MenuBox = (props) => {
  return (
    <div className="menu-grid-box">
      <div className="menu-image-container">
        <img src={props.imgSrc}></img>
      </div>
      <div className="menu-info-container">
        <div className="menu-info-box">
          <h2>{props.name}</h2>
          <p>{props.description}</p>
          <h3>{props.calories} cals</h3>
        </div>
      </div>
      <div className="menu-order-box">
        <a>
          <div className="intermediate-order-button">
            Start Order
          </div>
        </a>
      </div>
    </div>
  );
}

export default MenuBox;