import styles from "./Header.module.scss";
import BonApp from "../../assets/images/bonapp.jpg";
import { useState } from "react";
import HeaderNav from "./components/HeaderNav/HeaderNav";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`d-flex flex-row align-items-center ${styles.header}`}>
      <div className="flex-fill ">
        <div className="d-flex flex-row  align-items-center">
          <img src={BonApp} alt="logo" />
          <h2 className={styles.title}>
            <span>B</span>on' <span>A</span>
            pp
          </h2>
        </div>
      </div>
      <ul className={styles.HeaderList}>
        <button className="mr-5 btn btn-reverse-primary  ">
          <i className="fa-sharp fa-solid fa-heart mr-5"></i>
          <span>WishList</span>
        </button>
        <button className="btn  btn-primary">connexion</button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars mr-15 ${styles.menuBar}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="click"></div>
          <HeaderNav />
        </>
      )}
    </header>
  );
}
