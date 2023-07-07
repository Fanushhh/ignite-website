import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Redux setup
import store from "./app/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GameDetail } from "./components/GameDetail.jsx";
import { UpcomingGamesPage } from "./pages/UpcomingGames.jsx";
import { NewGamesPage } from "./pages/NewGamesPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "game/:id",
    element: <App />,
  },
  {
    path: "upcoming-games/game/:id",
    element: <UpcomingGamesPage />,
  },
  {
    path: "upcoming-games",
    element: <UpcomingGamesPage />,
  },
  {
    path: "new-games",
    element: <NewGamesPage />,
  },
  {
    path: "new-games/game/:id",
    element: <NewGamesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
