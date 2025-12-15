import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import NewsFeed from "./Pages/NewsFeed/NewsFeed";
import PostDetails from "./Pages/PostDetails/PostDetails";
import UserProfile from "./Pages/UserProfile/UserProfile";
import NotFound from "./Pages/NotFoundPage/NotFound";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import AppProtectedRoutes from "./Components/ProtectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./Components/ProtectedRoutes/AuthProtectedRoutes";
import MainLayout from "./Layouts/MainLayout/MainLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <AppProtectedRoutes>
          <MainLayout />
        </AppProtectedRoutes>
      ),
      children: [
        { index: true, element: <Navigate to={"/home"} /> },
        {
          path: "home",
          element: (
            <AppProtectedRoutes>
              <NewsFeed />
            </AppProtectedRoutes>
          ),
        },
        {
          path: "postDetails/:id",
          element: (
            <AppProtectedRoutes>
              <PostDetails />
            </AppProtectedRoutes>
          ),
        },
        {
          path: "userProfile/:id",
          element: (
            <AppProtectedRoutes>
              <UserProfile />
            </AppProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: "",
      element: (
        <AuthProtectedRoutes>
          <AuthLayout />
        </AuthProtectedRoutes>
      ),
      children: [
        {
          path: "register",
          element: (
            <AuthProtectedRoutes>
              <Register />
            </AuthProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoutes>
              <Login />
            </AuthProtectedRoutes>
          ),
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
