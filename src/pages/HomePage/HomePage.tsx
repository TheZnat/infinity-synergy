import styles from "./HomePage.module.css";
import ListUsers from "../../widgets/ListUsers/ListUsers";
import InfoUser from "../../widgets/InfoUser/InfoUser";

const HomePage = () => {
  return (
    <main className={styles["home-page"]}>
      <ListUsers />
      <InfoUser />
    </main>
  );
};

export default HomePage;
