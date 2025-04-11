import styles from "/src/styles/AuthSection.module.css";

const AuthSection = () => {
  return (
    <div className={styles.authSection}>
      <button>Sign in</button>
      <button>Register</button>
    </div>
  );
}

export default AuthSection;