import React, { useEffect, useState } from "react";

function PeopleList() {
  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .then((resp) => {
        setPeople(resp.results);
      });
  }, []);
  return <div>PeopleList</div>;
}

export default PeopleList;
