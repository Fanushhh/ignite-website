import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Redux setup
import store from "./app/store.js";
import { Provider } from "react-redux";
//React router setup
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Importing pages
import { UpcomingGamesPage } from "./pages/UpcomingGames.jsx";
import { NewGamesPage } from "./pages/NewGamesPage.jsx";
import { homeLoader } from "./assets/homeLoader.jsx";
import { gameDetailsLoader } from "./assets/gameDetailsLoader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: homeLoader,
  },
  {
    path: "game/:id",
    element: <App />,
    loader: ({ params }) => {
      return gameDetailsLoader(params.id);
    },
  },
  {
    path: "upcoming-games/game/:id",
    element: <UpcomingGamesPage />,
    loader: ({ params }) => {
      return gameDetailsLoader(params.id);
    },
  },
  {
    path: "upcoming-games",
    element: <UpcomingGamesPage />,
    loader: homeLoader,
  },
  {
    path: "new-games",
    element: <NewGamesPage />,
    loader: homeLoader,
  },
  {
    path: "new-games/game/:id",
    element: <NewGamesPage />,
    loader: ({ params }) => {
      return gameDetailsLoader(params.id);
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
