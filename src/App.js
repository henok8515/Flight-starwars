import React from "react";
import BookTrip from "./screens/BookTrip/index";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BookTrip />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
