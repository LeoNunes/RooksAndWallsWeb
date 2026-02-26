import { createBrowserRouter, RouterProvider } from "react-router";
import RnWGameManager from "./Controllers/RnWManager";
import GamePage from "./Pages/GamePage";
import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div className="App">
                <RnWGameManager />
            </div>
        ),
    },
    {
        path: "/game/rw/:gameId",
        element: (
            <div className="App">
                <GamePage />
            </div>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
