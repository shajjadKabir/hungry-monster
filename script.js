const searchInput = document.querySelector(".search-box input");
const searchBtn = document.getElementById("searchBtn");

const singleFoodDetails = document.getElementById("singleFoodDetails");
const searchResult = document.getElementById("searchResult");

const getSearchResult = () => {
    const foodTitle = searchInput.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodTitle}`;
    if (foodTitle) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.meals) {
                    searchResult.innerHTML = "";
                    data.meals.forEach(meal => {
                        searchResult.innerHTML += `
                        <div class="item col-md-3 my-2" data-id="${meal.idMeal}">
                        <div class=" card text-center" onclick="getFood(${meal.idMeal})" class = 'food-item'>
                            <img src="${meal.strMealThumb}" data-id="${meal.idMeal}" class="card-img-top">
                            <div class="card-body " data-id="${meal.idMeal}" >
                                <h3 class="card-text text-center " data-id="${meal.idMeal}">${meal.strMeal}</h3>
                            </div>
                        </div>
                    </div> 
                        `;
                    });

                } else {
                    searchResult.innerHTML = `<h3 class="text-center">Sorry! no meals found.</h3>`;
                }
                searchResult.style.display = "block";
                singleFoodDetails.innerHTML = "";
            });
    } else {
        alert("Please write a valid meal name");
    }
}


searchBtn.addEventListener("click", getSearchResult);
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (!searchInput.value) {
            alert("Please write a valid food name");
        }
    }
    if (searchInput.value) {
        getSearchResult();
    } else {
        searchResult.innerHTML = "";
    }
});

const getFood = mealID => {
    document.getElementById('searchResult').style.display = 'none';
    const singleFoodDetails = document.getElementById('singleFoodDetails');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            let item = data.meals[0];
            let ingredients = "";
            for (let i = 1; i <= 10; i++) {
                ingredients += `<li> 
                <i class="material-icons"> check_box </i> ${item["strIngredient" + i]}
                 </li>`;
            }
            console.log(item);
            searchResult.innerHTML = `
                <div class="single-food">
                    <img src="${item.strMealThumb}">
                    <h3>${item.strMeal}</h3>
                    <div class="single-food-second-div">
                    <h4>Ingredients</h4>
                    <ul>
                    ${ingredients}
                    </ul>
                    </div>
                </div>
            `
            singleFoodDetails.innerHTML = "";

        })
}