import React from "react";

import Result from "./Result";

const App = (props) => {
  console.log("props", props);
  console.log("window.location", window.location);

  const queryParams = new URLSearchParams(window.location.search);
  const week = Number(queryParams.get("week"));
  const year = Number(queryParams.get("year"));

  if (
    !week ||
    !year ||
    isNaN(week) ||
    isNaN(year) ||
    week < 1 ||
    week > 52 ||
    year < 2021
  ) {
    return <div>Invalid week or year parameter(s).</div>;
  }

  return <Result week={week} year={year} />;
};

export default App;
