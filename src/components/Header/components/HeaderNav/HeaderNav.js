import styles from "./HeaderNav.module.scss";

export default function HeaderNav() {
  return (
    <div>
      <ul className={`card p-20 ${styles.headerList}`}>
        <li>WishList</li>
        <li>Connexion</li>
      </ul>
    </div>
  );
}
