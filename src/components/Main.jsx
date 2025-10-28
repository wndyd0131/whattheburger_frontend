
const Main = () => {
  return (
    <div className="content-container">
      <div className="image-slider-container">
        <ImageSlider/>
      </div>
      <div className="order-button-container">
          <a className="start-order-button" src="#">Order<br/>for<br/>Delivery</a>
          <a className="start-order-button" src="#">Order<br/>for<br/>Pickup</a>
        </div>
      <div className="menu-list-container">
        <MenuList/>
      </div>
    </div>
  );
}

export default Main;