import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Header from "./Components/Header/Header";
import RnWGameManager from "./Controllers/RnWManager";
import { AuthStateProvider } from "./Domain/Auth/AuthStateProvider";
import ChooseDisplayNamePage from "./Pages/ChooseDisplayNamePage";
import GamePage from "./Pages/GamePage";
import OAuthCallbackHandler from "./Pages/OAuthCallbackHandler";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import "./App.css";

function Layout() {
    return (
        <AuthStateProvider>
            <div className="App">
                <Header />
                <Outlet />
            </div>
        </AuthStateProvider>
    );
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <RnWGameManager /> },
            { path: "/game/rw/:gameId", element: <GamePage /> },
            { path: "/sign-in", element: <SignInPage /> },
            { path: "/sign-up", element: <SignUpPage /> },
            { path: "/choose-display-name", element: <ChooseDisplayNamePage /> },
            { path: "/oauth/callback", element: <OAuthCallbackHandler /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
