import styles from "/src/styles/ProductDetailInput.module.css";

const ProductDetailInput = ({
  categories,
  productName,
  productPrice,
  productCalories,
  productType,
  briefInfo,
  selectedCategoryIds,
  setProductName,
  setProductPrice,
  setProductCalories,
  setProductType,
  setBriefInfo,
  setSelectedCategoryIds
}) => {
  const DEFAULT_OPTION_STRING = "----Select----";

  const handleClickCategoryButton = (categoryId, checkedCategory) => {
    if (checkedCategory)
      setSelectedCategoryIds(prev => prev.filter(index => index !== categoryId))
    else
      setSelectedCategoryIds(prev => [...prev, categoryId]);
  }

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
          <input id="briefInfoInput" className={styles.productInput} name="briefInfo" value={briefInfo} placeholder="brief information about new product" onChange={(e) => setBriefInfo(e.target.value)}/>
        </div>
        <label>Category *</label>
          <div className="flex flex-wrap w-full justify-start gap-5">
          {categories.map((category, categoryIdx) => {
            const categoryId = category.categoryId;
            const checkedCategory = selectedCategoryIds.find(index => index === categoryId);
            const regularClassName = "min-w-[110px] min-h-[35px] border-1 border-orange-300 rounded-full hover:bg-orange-300 cursor-pointer";
            const selectedClassName = "min-w-[110px] min-h-[35px] border-1 border-orange-300 bg-orange-300 rounded-full hover:bg-orange-400 cursor-pointer";

            return (
                <button
                  key={categoryIdx}
                  className={checkedCategory ? selectedClassName : regularClassName}
                  onClick={() => handleClickCategoryButton(categoryId, checkedCategory)}
                >
                  {category.name}
                </button>
            );
          })}
          </div>
      </div>
    </>
  );
}

export default ProductDetailInput;