const recipeList = document.querySelector("#recipeList");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#query");
const loader = document.querySelector(".loader");
const recipeBtnElem = document.querySelector("#openRecipe");
const recipeModalElem = document.querySelector("#recipeModal");
const closeRecipeModalBtnElem = document.querySelector("#recipeModalClose");

loader.style.display = "none";

function createRecipeItemHtml(
  image,
  label,
  calories,
  source,
  totalTime,
  cuisineType
) {
  return `<li class="dish">
    <div class="dish-card">
      <img src="${image}" alt="${label}" class="dish-img"/>
      <div class="dish-container">
        <h2 class="dish-choise">${label}</h2>
        <hr class="dish-hr" />
        <p class="menu-description"><span>Calories: </span>${Math.round(
          calories
        )}</p>
        <p class="recipe-source"><span>Source: </span>${source}</p>
        <p class="recipe-timing"><span>Total time: </span>${totalTime}min</p>
        <p class="cuisine-type"><span>Cuisine type: </span>${cuisineType}</p>
      </div>
      <button type="submit" id="openRecipe" class="open-recipe-btn">Open recipe</button>
    </div>
  </li>`;
}

searchForm.addEventListener("submit", (e) => {
  recipeList.innerHTML = "";
  e.preventDefault();
  loader.style.display = "block";
  fetch(
    `https://api.edamam.com/api/recipes/v2?q=${searchInput.value}&app_id=79ac891a&app_key=55a6cb8b916d9185310040c273d885c8%09&type=any`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (const hit of data.hits) {
        const recipe = hit.recipe;
        console.log(recipe.image);
        const recipeHtml = createRecipeItemHtml(
          recipe.image,
          recipe.label,
          recipe.calories,
          recipe.source,
          recipe.totalTime,
          recipe.cuisineType
        );

        recipeList.innerHTML += recipeHtml;
      }
    })
    .finally(() => {
      loader.style.display = "none";
    });
});

function openModal() {
  recipeModalElem.style.display = "block";
  setTimeout(() => {
    recipeModalElem.classList.add("modal_open");
  }, 0);
  document.body.style.overflow = "hidden";
  document.body.style.marginRight = "10px";
}

function closeModal() {
  recipeModalElem.classList.remove("modal_open");
  setTimeout(() => {
    recipeModalElem.style.display = "none";
    document.body.style.marginRight = "0";
    document.body.style.overflow = "auto";
  }, 300);
}

recipeBtnElem.addEventListener("click", openModal);
closeRecipeModalBtnElem.addEventListener("click", closeModal);
