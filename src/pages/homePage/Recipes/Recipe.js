import { useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import styles from "./Recipe.module.scss";

export default function Recipe({
  recipe: { _id, liked, title, img },
  toggleLikeRecipe,
}) {
  const ApiUrl = useContext(ApiContext);
  async function handleClick() {
    try {
      const response = await fetch(`${ApiUrl}/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ liked: !liked }),
      });
      if (response.ok) {
        const recipe = await response.json();
        toggleLikeRecipe(recipe);
      } else {
        console.log("erreur");
      }
    } catch (e) {
      console.log("erreur");
    }
  }

  return (
    <div onClick={handleClick} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={img} alt="recipe" />
      </div>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${styles.recipeTitle}`}
      >
        <h3 className="mb-10">{title}</h3>
        <i className={`fa-solid fa-heart ${liked ? "text-primary" : ""}  `}></i>
      </div>
    </div>
  );
}
