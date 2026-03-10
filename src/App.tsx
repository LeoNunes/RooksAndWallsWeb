import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Header from "./Components/Header/Header";
import RnWGameManager from "./Controllers/RnWManager";
import { UserStateProvider } from "./Domain/User/UserStateProvider";
import GamePage from "./Pages/GamePage";
import OAuthCallbackHandler from "./Pages/OAuthCallbackHandler";
import ProfilePage from "./Pages/ProfilePage";
import RegisterUserPage from "./Pages/RegisterUserPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import "./App.css";

function Layout() {
    return (
        <UserStateProvider>
            <div className="App">
                <Header />
                <Outlet />
            </div>
        </UserStateProvider>
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
            { path: "/register-user", element: <RegisterUserPage /> },
            { path: "/oauth/callback", element: <OAuthCallbackHandler /> },
            { path: "/profile", element: <ProfilePage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
