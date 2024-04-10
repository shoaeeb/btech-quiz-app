import { Link } from "react-router-dom";
import Styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={Styles.navbar}>
      <Link className={Styles.navbar__link} to="/">
        Home
      </Link>
    </nav>
  );
};

export default NavBar;
