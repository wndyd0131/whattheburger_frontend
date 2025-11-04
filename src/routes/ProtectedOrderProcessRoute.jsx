import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import Cookie from 'js-cookie';

const ProtectedOrderProcessRoute = () => {
  // const [searchParams] = useSearchParams();
  // const checkoutSessionId = searchParams.get("session_id");
  // if (!checkoutSessionId) {
  //   return <Navigate to="/" replace />
  // }
  // return <Navigate to={`/order/${storeId}#category-section`}/>;
}

export default ProtectedOrderProcessRoute;