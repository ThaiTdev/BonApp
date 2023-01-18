import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer
      className={` d-flex justify-content-center align-items-center p-20 ${styles.footer}`}
    >
      <p>Copyright 2022 Marmiton ThaiTdev, Inc</p>
    </footer>
  );
}
