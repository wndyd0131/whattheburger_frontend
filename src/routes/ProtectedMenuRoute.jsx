import Cookie from 'js-cookie';

const ProtectedMenuRoute = () => {
  const storeId = Cookie.get("storeId");
  if (!storeId) {
    return <Navigate to="/menu/store" replace />
  }
  return <Navigate to={`/menu/${storeId}#category-section`}/>;
}

export default ProtectedMenuRoute