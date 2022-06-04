/* eslint-disable no-label-var */
import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  reducer,
  LOADING_STATE,
  SET_DATA,
  SET_TRIP_DATA,
  DISPLAY_SUMMURY,
} from "./reducer";
import { getCurrentDate } from "./utilitis";
const initialState = {
  data: undefined,
  loadingState: "loading",
  tripData: {},
  toogle: false,
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
      const resDesPlanet = await axios.get("https://swapi.dev/api/planets");
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
      if (resDesPlanet.data) {
        data.desPlanet = resDesPlanet.data.results;
      }

      dispatch({
        type: SET_DATA,
        payload: data,
      });

      // console.log(resPeople.data.res, resPlanet, resSpecies, resVehicles);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handelChange = (option, key) => {
    dispatch({
      type: SET_TRIP_DATA,
      payload: {
        ...state.tripData,
        [key]: option.label,
      },
    });
  };

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
            <label>Date</label>
            <input type="date" />
            <label className="mb-2">User</label>
            <Select
              className="mb-8"
              defaultValue={getOptions(state.data.people)[0]}
              options={getOptions(state.data.people)}
              onChange={(option) => handelChange(option, "people")}
            />
            <label className="mb-2">Departure planet</label>
            <Select
              onChange={(option) => handelChange(option, "planet")}
              className="mb-8"
              defaultValue={getOptions(state.data.planet)[0]}
              options={state.data.planet.map((item) => ({
                label: item.name,
                value: item.url,
                img: item.url,
              }))}
            />

            {state.data.planet.map((item) => {
              return (
                <img
                  key={item.name}
                  className="h-10 w-8"
                  alt=""
                  src={item.url}
                />
              );
            })}

            <label className="mb-2">Destination planet</label>
            <Select
              onChange={(option) => handelChange(option, "destination")}
              className="mb-8"
              defaultValue={getOptions(state.data.desPlanet)[0]}
              options={state.data.desPlanet.map((item) => ({
                label: item.name,
                value: item.url,
              }))}
            />
            <label className="mb-2">Species</label>
            <Select
              onChange={(option) => {
                dispatch({
                  type: SET_TRIP_DATA,
                  payload: {
                    ...state.tripData,
                    species: option.label,
                  },
                });
              }}
              className="mb-8"
              defaultValue={getOptions(state.data.species)[0]}
              options={getOptions(state.data.species)}
            />
            <button
              onClick={() =>
                dispatch({
                  type: DISPLAY_SUMMURY,
                  payload: {
                    ...state,
                    toogle: true,
                  },
                })
              }
              className={`text-xl text-white bg-blue-600 w-full rounded whitespace-nowrap py-2`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {state.toogle && (
        <div className="text-center mt-10 border ">
          <h1 className="tex">Summary</h1>
          <p>Date : {getCurrentDate()}</p>
          <h1> People : {state.tripData.people}</h1>
          <h1>Departure: {state.tripData.planet}</h1>
          <h1>Destination: {state.tripData.destination}</h1>
          <h1>Species :{state.tripData.species}</h1>
          {/* <p> {state.tripData.planet.created}</p> */}
        </div>
      )}
    </div>
  );
}

export default BookTrip;
