// fetch data
$.get("https://www.themealdb.com/api/json/v1/1/search.php?s=", (data) => {
  // show the all meals
  data.meals.forEach((meal) => {
    $(".meals").append(`<div class="col-md-3 col-sm-6">
              <div class="meal" onclick="getInfo(${meal.idMeal})">
                <img
                  src=${meal.strMealThumb}
                  alt=${meal.strMeal}
                />

                <div class="overlay">
                  <h2>${meal.strMeal}</h2>
                </div>
              </div>
            </div>`);
  });
  $(".loading").css("display", "none");
});

// show navbar if it's true
let showNav = false;

$("#toggleMenu").on("click", () => {
  if (!showNav) {
    $(".slide-nav").css("left", 0);
    showNav = true;
    $("#toggleMenu").children()[0].remove();
    $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-xmark"></i>`);
  } else {
    $(".slide-nav").css("left", -250);
    showNav = false;
    $("#toggleMenu").children()[0].remove();
    $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  }
});

// get meal information
function getInfo(mealId) {
  $(".slide-nav").css("z-index", 9999);
  $(".loading").css("display", "flex");
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);

  $(".contact-us").css("display", "none");

  $(".content").empty();
  $(".meals").remove();

  $(".meals").empty();

  $(".meal-page").css("display", "block");
  $(".meal-page").empty();
  $.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    (data) => {
      let meal = data.meals[0];
      let recipes = [];

      for (const key in meal) {
        if (key.startsWith("strMeasure") && meal[key]) {
          recipes.push(meal[key]);
        }
      }

      // Use map to transform the array into a string
      const recipesString = recipes
        .map(
          (recipe) => `<span class='alert alert-info m-2 p-1'>${recipe}</span>`
        )
        .join(""); // Join the array elements into a single string

      console.log(recipesString);

      $(".meal-page").append(`
              <div class="meal-deatials">
              <div class="meal-preview">
                <img
                  class="w-100"
                  src=${meal.strMealThumb}
                  alt=${meal.strMeal}
                />

                <h3 class="text-center">${meal.strMeal}</h3>
              </div>

              <div class="meal-info">
                <h2>Instructions</h2>
                <p>
                 ${meal.strInstructions}
                </p>

                <h3>Area: <span>${meal.strArea}</span></h3>
                <h3>Category: <span>${meal.strCategory}</span></h3>
                <h3>Recipes:  ${recipesString}</h3>
                <h3>Tags: <p class="mt-3 d-flex gap-3"><a class="btn btn-success " href=${meal.strSource} target="_blank" >Source</a><a class="btn btn-danger " href=${meal.strYoutube} target="_blank" >Youtube</a></p></h3>
              </div>
            </div>
            `);
    }
  );
  $(".loading").css("display", "none");
}

// show search inputs
function searchInputs() {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").remove();
  $(".meal-page").remove();
  $(".categories").remove();
  $(".contact-us").css("display", "none");

  $(".search").css("display", "block");
}

function handleSearchByName(name) {
  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);

  $.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    (data) => {
      data.meals
        ? data.meals.forEach((meal) => {
            $(".content").append(`<div class="col-md-3 col-sm-6">
              <div class="meal" onclick="getInfo(${meal.idMeal})">
                <img
                  src=${meal.strMealThumb}
                  alt=${meal.strMeal}
                />

                <div class="overlay">
                  <h2>${meal.strMeal}</h2>
                </div>
              </div>
            </div>`);
          })
        : $(".content").append(
            "<h3 class='text-center mt-3'> This Meal Doesn't Exsit</h3>"
          );
    }
  );
  $(".loading").css("display", "none");
}

function handleSearchByFirstLetter(letter) {
  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);
  $.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
    (data) => {
      data.meals
        ? data.meals.forEach((meal) => {
            $(".content").append(`<div class="col-md-3 col-sm-6">
              <div class="meal" onclick="getInfo(${meal.idMeal})">
                <img
                  src=${meal.strMealThumb}
                  alt=${meal.strMeal}
                />

                <div class="overlay">
                  <h2>${meal.strMeal}</h2>
                </div>
              </div>
            </div>`);
          })
        : $(".content").append(
            "<h3 class='text-center mt-3'> This Meal Doesn't Exsit</h3>"
          );
    }
  );

  $(".loading").css("display", "none");
}

function getInfoByCategory(category) {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").css("display", "none");
  $(".meal-page").css("display", "none");
  $(".search").css("display", "none");
  $(".contact-us").css("display", "none");

  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);

  $.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    (data) => {
      const meals = data.meals;

      meals.forEach((meal) => {
        $(".content").append(`
              <div class="col-md-3 col-sm-6">
              <div class="meal" onclick="getInfo(${meal.idMeal})">
                <img
                  src=${meal.strMealThumb}
                  alt=${meal.strMeal}
                />

                <div class="overlay">
                  <h2>${meal.strMeal}</h2>
                </div>
              </div>
            </div>`);
      });
    }
  );
  $(".loading").css("display", "none");
}

function getCategories() {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").css("display", "none");
  $(".meal-page").css("display", "none");
  $(".search").css("display", "none");
  $(".contact-us").css("display", "none");

  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);
  $.get("https://www.themealdb.com/api/json/v1/1/categories.php", (data) => {
    const meals = data.categories;

    meals.forEach((meal) => {
      $(".content").append(`
              <div class="col-md-3 col-sm-6">
              <div class="meal" onclick="getInfoByCategory('${meal.strCategory}')">
                <img
                  src=${meal.strCategoryThumb}
                  alt=${meal.strCategory}
                />

                <div class="overlay">
                  <h2>${meal.strCategory}</h2>
                  <p>${meal.strCategoryDescription}</p>
                </div>
              </div>
            </div>`);
    });
  });
  $(".loading").css("display", "none");
}

function getArea() {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").css("display", "none");
  $(".meal-page").css("display", "none");
  $(".search").css("display", "none");
  $(".contact-us").css("display", "none");

  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);

  $.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list", (data) => {
    const meals = data.meals;
    console.log(meals);

    meals.forEach((meal) => {
      $(".content").append(`
      <div class="col-md-3 col-sm-6 c-pointer" onclick="getMealsByArea('${meal.strArea}')">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h2>${meal.strArea}</h2>
      </div>`);
    });
  });
  $(".loading").css("display", "none");
}

function getMealsByArea(area) {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").css("display", "none");
  $(".meal-page").css("display", "none");
  $(".search").css("display", "none");
  $(".contact-us").css("display", "none");

  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);

  $.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
    (data) => {
      const meals = data.meals;

      meals.forEach((meal) => {
        $(".content").append(`<div class="col-md-3 col-sm-6">
        <div class="meal" onclick="getInfo(${meal.idMeal})">
          <img
            src=${meal.strMealThumb}
            alt=${meal.strMeal}
          />
  
          <div class="overlay">
            <h2>${meal.strMeal}</h2>
          </div>
        </div>
      </div>`);
      });
    }
  );
  $(".loading").css("display", "none");
}

function getIngredients() {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").css("display", "none");
  $(".meal-page").css("display", "none");
  $(".search").css("display", "none");
  $(".contact-us").css("display", "none");

  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);

  $.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list", (data) => {
    let meals = data.meals.slice(0, 21);
    console.log(meals);

    meals.forEach((meal) => {
      $(".content")
        .append(`<div class="col-md-3 text-center col-sm-6 c-pointer" onclick="getMealByIngredient('${
        meal.strIngredient
      }')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${meal.strIngredient}</h3>
        <p>${meal.strDescription && meal.strDescription.slice(0, 150)}</p>
      </div>`);
    });
  });
  $(".loading").css("display", "none");
}

function getMealByIngredient(ingredient) {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").css("display", "none");
  $(".meal-page").css("display", "none");
  $(".search").css("display", "none");
  $(".contact-us").css("display", "none");

  $(".content").empty();

  $(".loading").css("display", "flex");
  $(".slide-nav").css("z-index", 9999);

  $.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    (data) => {
      const meals = data.meals;

      meals.forEach((meal) => {
        $(".content").append(`<div class="col-md-3 col-sm-6">
        <div class="meal" onclick="getInfo(${meal.idMeal})">
          <img
            src=${meal.strMealThumb}
            alt=${meal.strMeal}
          />
  
          <div class="overlay">
            <h2>${meal.strMeal}</h2>
          </div>
        </div>
      </div>`);
      });
    }
  );
  $(".loading").css("display", "none");
}

function ContactUs() {
  // collapse the navigation bar
  $(".slide-nav").css("left", -250);
  $("#toggleMenu").children()[0].remove();
  $("#toggleMenu").append(`<i class="fa-solid fa-2x fa-align-justify"></i>`);
  $(".meals").css("display", "none");
  $(".meal-page").css("display", "none");
  $(".search").css("display", "none");

  $(".content").empty();

  $(".contact-us").css("display", "flex");
}

function handleEmail(email) {
  if ($(".invalid-feedback").hasClass("d-block")) {
    $("#btn-submit").addClass("disabled");
  } else {
    $("#btn-submit").removeClass("disabled");
  }

  // Regular expression for a valid email address
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    $("#invalid-email").removeClass("d-block");
  } else {
    $("#invalid-email").addClass("d-block");
  }
}

function handleName(name) {
  if ($(".invalid-feedback").hasClass("d-block")) {
    $("#btn-submit").addClass("disabled");
  } else {
    $("#btn-submit").removeClass("disabled");
  }

  var regex = /^[a-zA-Z]*$/;
  if (regex.test(name)) {
    $("#invalid-name").removeClass("d-block");
  } else {
    $("#invalid-name").addClass("d-block");
  }
}

function handlePhone(phone) {
  if ($(".invalid-feedback").hasClass("d-block")) {
    $("#btn-submit").addClass("disabled");
  } else {
    $("#btn-submit").removeClass("disabled");
  }

  var egyptPhoneNumberRegex = /^\+20\d{10}$/;

  if (egyptPhoneNumberRegex.test(phone)) {
    $("#invalid-phone").removeClass("d-block");
  } else {
    $("#invalid-phone").addClass("d-block");
  }
}

function handleAge(age) {
  if ($(".invalid-feedback").hasClass("d-block")) {
    $("#btn-submit").addClass("disabled");
  } else {
    $("#btn-submit").removeClass("disabled");
  }

  if (age > 0) {
    $("#invalid-age").removeClass("d-block");
  } else {
    $("#invalid-age").addClass("d-block");
  }
}

let userPassword;
function handlePassword(password) {
  if ($(".invalid-feedback").hasClass("d-block")) {
    $("#btn-submit").addClass("disabled");
  } else {
    $("#btn-submit").removeClass("disabled");
  }

  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(password)) {
    userPassword = password;
    $("#invalid-password").removeClass("d-block");
  } else {
    $("#invalid-password").addClass("d-block");
  }
}

function handleRepassword(repassword) {
  if ($(".invalid-feedback").hasClass("d-block")) {
    $("#btn-submit").addClass("disabled");
  } else {
    $("#btn-submit").removeClass("disabled");
  }

  if (userPassword == repassword) {
    $("#invalid-repassword").removeClass("d-block");
  } else {
    $("#invalid-repassword").addClass("d-block");
  }
}
