import styles from "./HomePage.module.css";
import { InfoUser, ListUsers } from "../../widgets";

const HomePage = () => {
  return (
    <main className={styles["home-page"]}>
      <ListUsers />
      <InfoUser />
    </main>
  );
};

export default HomePage;
