import React, { useContext, useEffect } from 'react'
import { MenuContext } from '../../contexts/MenuContext'
import MenuHeader from './MenuHeader';
import CategoryNav from './CategoryNav';
import MenuContainer from './MenuContainer';
import OrderModal from './OrderModal/OrderModal';
import { useNavigate, useParams } from 'react-router-dom';

const MenuSection = () => {
  const {
    selectedProduct,
    selectedCategoryId
  } = useContext(MenuContext);

  const {storeId} = useParams();

  const nav = useNavigate();

  useEffect(() => {
    if (!selectedCategoryId) return;
    
    nav(
      `/menu/${storeId}?categoryId=${selectedCategoryId}#category-section`,
      { replace: true }
    );
    const element = document.getElementById("category-section");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }, [selectedCategoryId]);

  return (
    <div id="category-section" className="rounded-t-[80px] bg-white scroll-mt-[60px] shadow-2xl relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
      <MenuHeader/>
      <div className="flex relative pb-[80px] px-8 w-full">
        <CategoryNav/>
        <MenuContainer/>
        <div className="flex basis-2/12"></div>
      </div>
      {selectedProduct !== null &&
        <OrderModal mode="menu"/>
      }
    </div>
  )
}

export default MenuSection