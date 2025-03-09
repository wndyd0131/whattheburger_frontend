import { useState, useEffect } from "react";
import "../styles/Menu.styles.css";
import MenuBox from "../components/Menu/MenuBox";
import OrderSummary from "../components/OrderSummary";
import OrderCustomize from "../components/OrderCustomize";
import axios from "axios";

const Menu = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const OrderButtonClickHandler = (product) => {
    setSelectedProduct(product);
    setModalOpened(true);
  }

  useEffect(() => { /* Get Product By Category */
    axios.get(`http://localhost:8080/api/v1/products/category/${selectedCategory}`)
    .then(response => setProducts(response.data))
    .catch(error => console.error("Error: ", error));
  }, [selectedCategory])
  
  const categoryList = [
    { id: 1, name: "Burgers", imgSrc: "/icons/category/burger_icon.svg"},
    { id: 2, name: "Chicken", imgSrc: "/icons/category/chicken_icon.svg"},
    { id: 3, name: "Fish", imgSrc: "/icons/category/fish_icon.svg"},
    { id: 4, name: "ATF_LTO", imgSrc: "/icons/category/star_icon.svg"},
    { id: 5, name: "Kids", imgSrc: "/icons/category/kids_icon.svg"},
    { id: 6, name: "Sides", imgSrc: "/icons/category/fries_icon.svg"},
    { id: 7, name: "Salad", imgSrc: "/icons/category/salad_icon.svg"},
    { id: 8, name: "Dessert", imgSrc: "/icons/category/dessert_icon.svg"},
    { id: 9, name: "Drink", imgSrc: "/icons/category/drink_icon.svg"},
    { id: 10, name: "Large Order", imgSrc: "/icons/category/group_icon.svg"},
  ]
  const menuList = [
    {
      id: 1,
      name: "Whataburger",
      description: 'Large Bun (5"), Large Beef Patty (5") (1), Tomato (Regular), Lettuce (Regular), Pickles (Regular), Diced Onions (Regular), Mustard (Regular)',
      calories: 700,
      imgSrc: "src/assets/menu/Whataburger31.png"
    },
    {
      id: 2,
      name: "Double Meat Whataburger",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quidem minus natus temporibus, esse aliquam eius aspernatur libero ratione odit, culpa repudiandae quod optio animi commodi illo earum quaerat molestiae.",
      calories: 770,
      imgSrc: "src/assets/menu/DoubleMeatWhataburger37.png"
    },
    {
      id: 3,
      name: "Triple Meat Whataburger",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reiciendis perferendis architecto facilis voluptatem mollitia quae fugiat voluptatibus pariatur qui, facere perspiciatis eius sequi quidem quos, assumenda maiores alias libero.",
      calories: 770,
      imgSrc: "src/assets/menu/TripleMeatWhataburger26.png"
    },
    {
      id: 4,
      name: "Jalapeno & Cheese Whataburger",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reiciendis perferendis architecto facilis voluptatem mollitia quae fugiat voluptatibus pariatur qui, facere perspiciatis eius sequi quidem quos, assumenda maiores alias libero.",
      calories: 770,
      imgSrc: "src/assets/menu/JalapenoCheeseWhataburger19.png"
    },
    {
      id: 5,
      name: "Bacon & Cheese Whataburger",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reiciendis perferendis architecto facilis voluptatem mollitia quae fugiat voluptatibus pariatur qui, facere perspiciatis eius sequi quidem quos, assumenda maiores alias libero.",
      calories: 770,
      imgSrc: "src/assets/menu/BaconCheeseWhataburger22.png"
    }
  ]

  const handleSelectedCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  }

  return (
    <>
      <div className="content-container">
        <div className="menu-container">
          <div className="category-nav">
            <ul>
              {categoryList.map((category) => 
                  <li
                    key={category.id}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <a onClick={() => handleSelectedCategory(category.id)}>
                      <img src={category.imgSrc}/>
                    </a>
                    <div className={`hovered-category-box ${hoveredCategory === category.id ? "active" : ""}`}>
                      <p>
                        {category.name}
                      </p>
                    </div>
                  </li>
                )}
            </ul>
          </div>

          <div className="menu-box">
            <h1>MENU</h1>
            <h2>{categoryList[selectedCategory-1].name}</h2>
            <div className="menu-grid">
              {products.map( product => 
                  <MenuBox key={product.productId} name={product.productName} description={product.briefInfo} calories={700} imgSrc="/src/assets/menu/Whataburger31.png" setModalOpened={() => OrderButtonClickHandler(product)}></MenuBox>
              )}
            </div>
          </div>
        </div>
        {modalOpened && (
          <div className="overlay">
            <div className="order-layout">
              <div className="close-order-modal-button" onClick={() => setModalOpened(false)}>
                X
              </div>
              <OrderSummary product={selectedProduct}/>
              <OrderCustomize/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;