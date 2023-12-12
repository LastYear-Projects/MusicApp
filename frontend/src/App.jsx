import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SongPage from "./pages/SongPage/SongPage";
import UserProfile from "./pages/UserPage/UserPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/song", element: <SongPage /> },
  { path: "/profile", element: <UserProfile /> },
  { path: "*", element: <NotFoundPage /> },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {routes.map(({ path, element }) => {
        return <Route key={path} path={path} element={element} />;
      })}
    </>
  )
);

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div style={{ flex: 1 }}>
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
