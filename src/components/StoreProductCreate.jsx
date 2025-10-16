import React, { useContext, useState } from 'react'
import { StoreProductCreateContext } from '../contexts/StoreProductCreateContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

const StoreProductCreate = () => {

  const {
    stores,
    products
  } = useContext(StoreProductCreateContext);

  const [selectedStoreIds, setSelectedStoreIds] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClickStoreNumber = (storeId) => {
    if (selectedStoreIds.includes(storeId)) {
      setSelectedStoreIds(prev => prev.filter(id => id !== storeId));
    } else {
      setSelectedStoreIds(prev => ([...prev, storeId]));
    }
  }

  const handleClickProductCard = (productId) => {
    setSelectedProductId(productId);
  }

  const handleClickSelectedStoreNumber =(storeId) => {
    setSelectedStoreIds(prev => prev.filter(id => id !== storeId));
  }

  const handleClickRegisterButton = () => {
    const requestBody = {
      productId: selectedProductId,
      storeIds: selectedStoreIds
    }
    if (selectedProductId !== null && selectedStoreIds.length > 0) {
      api.post("/store/product", requestBody)
        .then(res => {
          console.log(res.data);
          setSelectedProductId(null);
          setSelectedStoreIds([]);
          toast.success('Product successfully registered', {
            autoClose: 5000
          });
        })
        .catch(err => {
          console.error(err);
          toast.error(err.response.data.message, {
            autoClose: false
          });
        });
    } else {
      // exception
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-[150px] px-[200px] gap-[50px]">
      <div className="flex flex-col gap-[20px]">
        <h2>Store</h2>
        <p>Please select the store numbers that you want the product to be registered and press right button to add to the right box.</p>
        <div className="flex flex-col justify-evenly items-center">
          <div className="flex w-full h-[400px] border border-gray-200 rounded-lg p-5">
            <div className="grid grid-cols-10 gap-4 overflow-y-auto border-1 border-gray-200 rounded-lg p-5 bg-gray-200 w-full">
              {stores.map((store, idx) => {
                const storeId = store.storeId;
                const selected = selectedStoreIds.includes(storeId);
                return(
                  <div
                    key={idx}
                    className={`flex justify-center h-[30px] w-[50px] rounded-sm bg-white border shadow-md cursor-pointer ${selected ? "border-[#FE7800]" : "border-gray-200"}`}
                    onClick={() => handleClickStoreNumber(storeId)}
                  >
                    {storeId}
                  </div>
              )})}
    
            </div>
          </div>
          <div className="flex justify-center m-5 gap-5">
          </div>
          <div className="flex w-full h-[400px] border border-gray-200 rounded-lg p-5">
            <div className="grid grid-cols-10 overflow-y-auto border-1 border-gray-200 rounded-lg p-5 bg-gray-200 w-full">
              {selectedStoreIds.map((storeId, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex justify-center h-[30px] w-[50px] rounded-sm bg-white border border-gray-200 shadow-md cursor-pointer"
                    onClick={() => handleClickSelectedStoreNumber(storeId)}
                  >
                    {storeId}
                  </div>
                )})}

            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <h2>Product</h2>
        <p>Please select the product that you want to register.</p>
        <div className='grid grid-cols-5 overflow-y-auto border-1 border-gray-200 rounded-lg p-5 max-h-[800px] h-full w-full'>
          {products.map((product, idx) => {
            const productId = product.productId;
            const selected = selectedProductId === productId;
            return (
              <div className="flex justify-center p-2">
                <div
                  className={`flex flex-col w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2
                    ${selected ? "border-[#FE7800]" : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"}
                    `}
                  onClick={() => handleClickProductCard(productId)}
                >
                  <div className="relative flex justify-center items-center min-h-[160px] w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                    <img
                      className="relative w-[140px] h-[140px] object-cover rounded-xl shadow-sm"
                      src={product.imageSource}
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white">
                    <h3 className="font-['Whatthefont'] text-[#FE7800]">
                      #{product.productId}
                    </h3>
                    <h3 className='text-lg font-["Whatthefont"] text-[#FE7800]'>{product.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="flex w-[100px] h-[50px] text-lg bg-white text-[#FE7800] border border-gray-200 rounded-md font-['Whatthefont'] justify-center self-center items-center cursor-pointer hover:bg-gray-100"
        onClick={() => handleClickRegisterButton()}
      >
        Register
      </button>
    </div>
  )
}

export default StoreProductCreate