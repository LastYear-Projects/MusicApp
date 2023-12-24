import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SongPage from "./pages/SongPage/SongPage";
import UserProfile from "./pages/UserPage/UserPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { gapi } from "gapi-script";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes";

const routes = [
  // { path: "/", element: <HomePage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/song/:id", element: <SongPage /> },
  { path: "/profile", element: <UserProfile /> },
  { path: "*", element: <NotFoundPage /> },
];

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    //TODO:check what is the chat for
    plugin_name: "chat",
  });
});
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Footer />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoutes />}>
            {routes.map(({ path, element }) => {
              return <Route key={path} path={path} element={element} />;
            })}
          </Route>
        </Route>
      </Route>
    </>
  )
);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flex: 1 }}>
          <RouterProvider router={router} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
