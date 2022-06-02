import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { reducer, LOADING_STATE, SET_DATA } from "./reducer";
const initialState = {
  data: undefined,
  loadingState: "loading",
};

function BookTrip() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch({
        type: LOADING_STATE,
        payload: "loading",
      });
      let data = {};
      const resPeople = await axios.get("https://swapi.dev/api/people");
      const resPlanet = await axios.get("https://swapi.dev/api/planets");
      const resSpecies = await axios.get("https://swapi.dev/api/species");
      const resVehicles = await axios.get("https://swapi.dev/api/vehicles");

      if (resPeople.data) {
        data.people = resPeople.data.results;
      }
      if (resPlanet.data) {
        data.planet = resPlanet.data.results;
      }
      if (resVehicles.data) {
        data.vehicles = resVehicles.data.results;
      }
      if (resSpecies.data) {
        data.species = resSpecies.data.results;
      }
      console.log(data);

      dispatch({
        type: SET_DATA,
        payload: data,
      });

      // console.log(resPeople.data.res, resPlanet, resSpecies, resVehicles);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  console.log("State: ", state);

  return (
    <div>
      <h1>Book trip</h1>
      {state.loadingState === "loading" && <h1>Loading data...</h1>}
      {state.loadingState === "success" && (
        <div>
          {" "}
          <h1>Form here</h1>{" "}
        </div>
      )}
      {/* <Select /> */}
    </div>
  );
}

export default BookTrip;
