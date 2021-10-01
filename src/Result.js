import React, { useEffect, useState } from "react";

const Result = ({ week, year }) => {
  const [menu, setMenu] = useState({});

  useEffect(() => {
    let headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzU3MjgyNTUsImlhdCI6MTYzMzA5ODUxMiwiaXNzIjoic2VuZiIsImp0aSI6IjRlZTUxMjk5LTc4OGYtNDdkNS1iYzk3LTc5NTE5M2E1YzkzZCJ9.ncDZfpAZsWXqTKWXzk1_GZUtUDFnvmsv1BO4T-JT2m8"
    );

    fetch(
      `https://www.hellofresh.com/gw/menus-service/menus?exclude=steps&country=de&locale=de-DE&product=classic-box&week=${year}-W${week}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => setMenu(data));
  }, [week, year]);

  console.log("menu", menu);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {menu?.items && (
        <>
          <h3>{menu?.items[0].headline ?? "Loading..."}</h3>
          <div>
            {menu.items[0].courses
              .sort((a, b) => getProteinAmount(b) - getProteinAmount(a))
              .map((course) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid black",
                    borderRadius: 5,
                    margin: 10,
                    padding: 10,
                    alignItems: "center",
                    width: 450,
                  }}
                >
                  <h3 key={course.index}>{course.recipe.name}</h3>
                  <div>{getCaloriesAmount(course)}kcal</div>
                  <div>{getProteinAmount(course)}g Protein</div>
                  <div>{getFatAmount(course)}g Fat</div>
                  <div>{getCarbAmount(course)}g Carbohydrates</div>
                  <img
                    src={`https://img.hellofresh.com/hellofresh_s3${course.recipe.imagePath}`}
                    width="300"
                    alt="Alt"
                    style={{
                      margin: 10,
                    }}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Result;

const getCaloriesAmount = (course) => {
  return getNutritionAmount(course, "Energie (kcal)");
};

const getProteinAmount = (course) => {
  return getNutritionAmount(course, "Eiweiß");
};

const getFatAmount = (course) => {
  return getNutritionAmount(course, "Fett");
};

const getCarbAmount = (course) => {
  return getNutritionAmount(course, "Kohlenhydrate");
};

const getNutritionAmount = (course, name) => {
  return course.recipe.nutrition.filter(
    (nutrition) => nutrition.name === name
  )[0].amount;
};
