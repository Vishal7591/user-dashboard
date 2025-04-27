import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./../store/configureStore";
import { List } from "./List";
import { BrowserRouter, Route, Routes } from "react-router";
import { Details } from "./Details";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<List />} />
          <Route index path="details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
