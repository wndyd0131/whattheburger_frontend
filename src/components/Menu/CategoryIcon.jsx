import React, { useContext } from 'react'
import { BreakfastIcon, BurgerIcon, ChickenIcon, DessertIcon, DrinkIcon, FishIcon, GroupIcon, KidsIcon, SaladIcon, SidesIcon, SpecialIcon } from '../../svg/categoryNav'
import { MenuContext } from '../../contexts/MenuContext';

const CategoryIcon = ({category, categoryIdx}) => {
  const {
      selectedCategory,
    } = useContext(MenuContext);
    
  const selected = category.categoryId === selectedCategory.categoryId;

  switch(categoryIdx) {
    case 0: {
      return <BurgerIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 1: {
      return <ChickenIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 2: {
      return <FishIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 3: {
      return <SpecialIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 4: {
      return <KidsIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 5: {
      return <SidesIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 6: {
      return <DessertIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 7: {
      return <DrinkIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 8: {
      return <GroupIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    case 9: {
      return <BreakfastIcon color={selected ? "#FE7800" : "#555555"}/>
    }
    default: {
      return null;
    }
  }
}

export default CategoryIcon;