import { useContext } from "react";
import styles from "/src/styles/AuthSection.module.css";
import { UserContext } from "../contexts/UserContext";

const AuthSection = () => {

  const {
    userDetails
  } = useContext(UserContext);

  {console.log(userDetails)}
  return (
    <>
    {userDetails.isAuthenticated === true ?
    <div>
      <img></img>
      <p>{`Welcome ${userDetails.firstName} ${userDetails.lastName}`}</p>
    </div>
    :
    <div className={styles.authSection}>
      <button><a href="/auth">Sign in</a></button>
      <button>Register</button>
    </div>  
    } 

    </>
  );
}

export default AuthSection;