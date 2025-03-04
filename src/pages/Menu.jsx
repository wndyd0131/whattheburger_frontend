import "../styles/Menu.styles.css";

const Menu = () => {
  return (
    <>
      <div className="content-container">
        <div className="menu-container">
          <div className="category-nav">
            <ul>
              <li>
                <a>
                  <img src="/icons/category/burger_icon.svg"></img>
                </a>
              </li>
              <li>
                <a>
                  <img src="/icons/category/chicken_icon.svg"></img>
                </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/fish_icon.svg"></img>
              </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/star_icon.svg"></img>
              </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/kids_icon.svg"></img>
              </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/fries_icon.svg"></img>
              </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/salad_icon.svg"></img>
              </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/dessert_icon.svg"></img>
              </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/drink_icon.svg"></img>
              </a>
              </li>
              <li>
              <a>
                <img src="/icons/category/group_icon.svg"></img>
              </a>
              </li>
            </ul>
          </div>

          <div className="menu-box">
            <h1>MENU</h1>
            <h2>Burger</h2>
            <div className="menu-grid">
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/Whataburger31.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Whataburger</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>700 cals</h3>
                </div>
              </div>
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/DoubleMeatWhataburger37.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Double Meat Whataburger</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>770 cals</h3>
                </div>
              </div>
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/TripleMeatWhataburger26.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Triple Meat Whataburger</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>770 cals</h3>
                </div>
              </div>
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/JalapenoCheeseWhataburger19.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Jalapeno & Cheese Whataburger</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>770 cals</h3>
                </div>
              </div>
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/BaconCheeseWhataburger22.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Bacon & Cheese Whataburger</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>770 cals</h3>
                </div>
              </div>
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/AvocadoBaconBurger19.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Avocado Bacon Burger</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>770 cals</h3>
                </div>
              </div>
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/WhataburgerJr.16.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Whataburger Jr.</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>770 cals</h3>
                </div>
              </div>
              <div className="menu-grid-box">
                <div className="menu-image-container">
                  <img src="src/assets/menu/DoubleMeatWhataburgerJr.26.png"></img>
                </div>
                <div className="menu-info-container">
                  <h2>Double Meat Whataburger Jr.</h2>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.</p>
                  <h3>770 cals</h3>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    </>
  );
}

export default Menu;