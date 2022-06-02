import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { reducer, LOADING_STATE, SET_DATA, SET_TRIP_DATA } from "./reducer";

const initialState = {
  data: undefined,
  loadingState: "loading",
};
const getOptions = (arr) => {
  const options = arr.map((item) => ({
    label: item.name,
    value: item.url,
  }));

  return options;
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
      <h1 className="text-center mb-8 mt-6 text-2xl">Book trip</h1>
      {state.loadingState === "loading" && <h1>Loading data...</h1>}
      {state.showTripDetail && (
        <div>
          <h3>People: {state.tripData.people}</h3>
        </div>
      )}
      {state.loadingState === "success" && (
        <div className="flex justify-center w-full">
          <div className=" w-full max-w-[600px]">
            <label className="mb-2">User</label>
            <Select
              className="mb-8"
              defaultValue={getOptions(state.data.people)[0]}
              options={getOptions(state.data.people)}
              onChange={(option) => {
                dispatch({
                  type: SET_TRIP_DATA,
                  payload: {
                    ...state.tripData,
                    people: option.label,
                  },
                });
              }}
            />

            <label className="mb-2">Departure planet</label>
            <Select
              className="mb-8"
              defaultValue={getOptions(state.data.planet)[0]}
              options={state.data.planet.map((item) => ({
                label: item.name,
                value: item.url,
              }))}
            />

            <label className="mb-2">Destination planet</label>
            <Select
              className="mb-8"
              defaultValue={getOptions(state.data.planet)[0]}
              options={state.data.planet.map((item) => ({
                label: item.name,
                value: item.url,
              }))}
            />

            <Select
              className="mb-8"
              defaultValue={getOptions(state.data.species)[0]}
              options={getOptions(state.data.species)}
            />

            <button
              onClick={() => {}}
              className={`text-xl text-white bg-blue-600 w-full rounded whitespace-nowrap py-2`}
            >
              Confirm
            </button>

            {/* People */}
            {/* <Select />
          <Select /> */}
          </div>
        </div>
      )}
      {/* <Select /> */}
    </div>
  );
}

export default BookTrip;
