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
          <label htmlFor="productNameInput">Product Name *</label>
          <input id="productNameInput" className={styles.productInput} name="product" value={productName} placeholder="new product's name" onChange={(e) => setProductName(e.target.value)}/>
          <label htmlFor="productPriceInput">Product Price *</label>
          <input id="productPriceInput" className={styles.productInput} name="productPrice" value={productPrice} type="number" placeholder="new product's price" onChange={(e) => setProductPrice(e.target.value)}/>
          <label htmlFor="productCaloriesInput">Product Calories *</label>
          <input id="productCaloriesInput" className={styles.productInput} name="productCalories" value={productCalories} type="number" placeholder="new product's calories" onChange={(e) => setProductCalories(e.target.value)}/>
          <label htmlFor="productTypeInput">Product Type *</label>
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
          <label htmlFor="briefInfoInput">Brief Information</label>
          <input id="briefInfoInput" className={styles.productInput} name="briefInfo" value={briefInfo} placeholder="brief information about new product" onChange={() => setBriefInfo()}/>
          <label htmlFor="categoryInput">Category *</label>
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