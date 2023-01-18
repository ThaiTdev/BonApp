import styles from "./HomePage.module.scss";
import Recipe from "./Recipes/Recipe";
import Loading from "../../components/Loading/Loading";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";

function HomePage() {
  const [filter, setFilter] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const ApiUrl = useContext(ApiContext);

  function handleInput(e) {
    //je passe la valeur de mon input dans la variable d'état filter
    const filter = e.target.value;
    //je passe la méthode trim() pour enlever les espace avant et après la chaine de caractère
    //et la méthode toLowerCase() pour que le text entré soit toujour en minuscule
    setFilter(filter.trim().toLowerCase());
  }

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setLoading(true);
        const response = await fetch(
          `${ApiUrl}?skip=${(page - 1) * 6}&limit=6`
        );
        if (response.ok && !cancel) {
          const data = await response.json();
          // cette ligne de code permet de trier les recttes dans l'ordre alphabétique
          const recipeSort = data.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setRecipes((x) =>
            Array.isArray(recipeSort)
              ? [...x, ...recipeSort]
              : [...x, ...recipeSort]
          );
        }
      } catch (e) {
        console.log("ereur2");
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => (cancel = true);
  }, [ApiUrl, page]);

  function UpdateRecipe(updatedRecipe) {
    setRecipes(
      recipes.map((recipe) =>
        recipe._id === updatedRecipe._id ? updatedRecipe : recipe
      )
    );
  }

  return (
    <div
      className={`flex-fill container p-20 d-flex flex-column ${styles.content}`}
    >
      <h1 className=" my-30 ">
        Découvrez nos nouvelles recettes
        <small className={`${styles.small}`}>{recipes.length} Plats</small>
      </h1>

      <div
        className={`card p-20 d-flex flex-column flex-fill pb-20 ${styles.contentCard} `}
      >
        <div
          className={`d-flex flex-row justify-content-center align-items-center my-30 ${styles.searchBar}`}
        >
          {/* //Bar De Recherche */}
          <i className="fa-solid fa-magnifying-glass mr-15"></i>
          {/* le onInput={handleInput} fait appel à ma fonction handleInput() qui récupère la valeur de l'input  */}
          <input
            onInput={handleInput}
            className="flex-fill "
            type="text"
            placeholder="Rechercher"
          />
        </div>

        {/* la variable Recipes est le tableau data trier dans l'ordre */}
        {/* la méthode filter() va afficher tout les élements du tableau dont la première lettre commence comme la première lettre tapée dans l'input grace à la méthode startsWith() */}
        {/* et enfin la méthode map() va afficher tout ces éléments  */}

        {loading && !recipes.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((element) =>
                element.title.toLowerCase().startsWith(filter)
              )
              .map((element) => (
                <Recipe
                  key={element._id}
                  recipe={element}
                  toggleLikeRecipe={UpdateRecipe}
                />
              ))}
          </div>
        )}
        <div className="d-flex flex-row justify-content-center align-item-center p-20">
          <button onClick={() => setPage(page + 1)} className="btn btn-primary">
            Afficher plus!
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
