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
        <p>Please fill in information of new product.</p>
        <div className={styles.productFormGrid}>
          <label htmlFor="productNameInput">product name:</label>
          <input id="productNameInput" className={styles.productInput} name="product" value={productName} placeholder="new product's name" onChange={() => setProductName()}/>
          <label htmlFor="productPriceInput">product price:</label>
          <input id="productPriceInput" className={styles.productInput} name="productPrice" value={productPrice} type="number" placeholder="new product's price" onChange={() => setProductPrice()}/>
          <label htmlFor="productCaloriesInput">product calories:</label>
          <input id="productCaloriesInput" className={styles.productInput} name="productCalories" value={productCalories} type="number" placeholder="new product's calories" onChange={() => setProductCalories()}/>
          <label htmlFor="productTypeInput">product type:</label>
          <select id="productTypeInput" className={styles.productInput} value={productType} onChange={(e) => setProductType(e.target.value)}>
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
          <label htmlFor="briefInfoInput">brief information:</label>
          <input id="briefInfoInput" className={styles.productInput} name="briefInfo" value={briefInfo} placeholder="brief information about new product" onChange={() => setBriefInfo()}/>
          <label htmlFor="categoryInput">category:</label>
          <select id="categoryInput" className={styles.productInput} value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
            <option value="" disabled>
              {DEFAULT_OPTION_STRING}
            </option>
            {categories.map((category, categoryIdx) => {
              return (
                <option key={categoryIdx} value={category.categoryId}>{category.name}</option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}

export default ProductDetailInput;