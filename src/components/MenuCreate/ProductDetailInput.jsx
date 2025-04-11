import styles from "/src/styles/ProductDetailInput.module.css";

const ProductDetailInput = ({
  categories,
  productName,
  productPrice,
  productCalories,
  productType,
  briefInfo,
  selectedCategoryId,
  setProductName,
  setProductPrice,
  setProductCalories,
  setProductType,
  setBriefInfo,
  setSelectedCategoryId
}) => {
  const DEFAULT_OPTION_STRING = "----Select----";

  return (
    <>
      <div className={styles.inputContainer}>
        <h2>Product</h2>
        <p>Please type in information of new product.</p>
        <label>
          product name: <input name="product" value={productName} placeholder="new product's name" onChange={() => setProductName()}/>
        </label>
        <label>
          product price: <input name="productPrice" value={productPrice} type="number" placeholder="new product's price" onChange={() => setProductPrice()}/>
        </label>
        <label>
          product calories: <input name="productCalories" value={productCalories} type="number" placeholder="new product's calories" onChange={() => setProductCalories()}/>
        </label>
        <label>
        product type:
        <select value={productType} onChange={(e) => setProductType(e.target.value)}>
          <option value="" disabled>
            {DEFAULT_OPTION_STRING}
          </option> 
          <option value="ONLY">
            Only
          </option>
          <option value="MEAL">
            Meal
          </option>
        </select>
        </label>
        <label>
          brief information: <input name="briefInfo" value={briefInfo} placeholder="brief information about new product" onChange={() => setBriefInfo()}/>
        </label>
        <label>
          category:
            <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
              <option value="" disabled>
                {DEFAULT_OPTION_STRING}
              </option>
              {categories.map((category, categoryIdx) => {
                return (
                  <option key={categoryIdx} value={category.categoryId}>{category.name}</option>
                );
              })}
            </select>
        </label>
      </div>
    </>
  );
}

export default ProductDetailInput;