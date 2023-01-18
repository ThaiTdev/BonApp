import Header from "./components/Header/Header";
import HomePage from "./pages/homePage/HomePage";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
//j'ajoute des data a mon serveur
// import { SeedRecipes } from "./components/Data/Seed";
// SeedRecipes();

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
