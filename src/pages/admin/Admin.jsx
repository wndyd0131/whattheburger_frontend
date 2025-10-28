import { useEffect, useState } from 'react'
import api from '../../utils/api';

const Admin = () => {
  const [productOpen, setProductOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [menuState, setMenuState] = useState(0);

  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const handleClickProductButton = () => {
    setProductOpen(prev => !prev);
  }

  const handleClickStoreButton = () => {
    setStoreOpen(prev => !prev);
  }

  const handleProductCreateButton = () => {
    setMenuState(1);
  }

  useEffect(() => {
    api.get("/store")
      .then(res => {
        setStores(res.data);
      })
      .catch(err => console.error(err));
    api.get("/products")
      .then(res => {
        setProducts(res.data);
      })
  }, []);

  return (
    <div className="flex font-[sans-serif] w-full max-md:m-0">
      <div className='flex bg-white min-w-[300px] max-w-[350px] w-full p-5 h-full shadow-md'>
        <List
          sx={{ height: '100%', width: '100%', maxWidth: 360}}
          component='nav'
          subheader={
            <ListSubheader component="div">
              Admin Menu
            </ListSubheader>
          }
        >
          <ListItemButton onClick={handleClickProductButton}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Manage Catalog"/>
            {productOpen ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>
          <Collapse in={productOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4}} onClick={handleProductCreateButton}>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="Create"/>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickStoreButton}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Manage Stores"/>
            {storeOpen ? <ExpandLess/> : <ExpandMore/>}
          </ListItemButton>
          <Collapse in={storeOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4}} onClick={() => setMenuState(2)}>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="Register Product"/>
              </ListItemButton>
            </List>
          </Collapse>
          <Collapse in={storeOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4}} onClick={() => setMenuState(3)}>
                <ListItemIcon>

                </ListItemIcon>
                <ListItemText primary="Manage Products"/>
              </ListItemButton>
            </List>
          </Collapse>

        </List>
      </div>
      <div className="flex w-full">
        {
          menuState === 1 && <MenuCreate/>
        } {
          menuState === 2 && (
            <StoreProductCreateProvider
              stores={stores}
              products={products}
            >
              <StoreProductCreate/>
            </StoreProductCreateProvider>
          )
        }
      </div>
    </div>
  )
}

export default Admin;