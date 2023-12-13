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
import List from "./components/list/List";

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
      <Route path="/" element={<Navbar />}>
        {routes.map(({ path, element }) => {
          return <Route key={path} path={path} element={element} />;
        })}
      </Route>
    </>
  )
);
const cardArray = [
  {
    album_image: "https://picsum.photos/200",
    title: "Nana",
    album: "Malibu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nana",
    album: "Malibu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
];

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: 1 }}>
        <RouterProvider router={router} />
        <List list={cardArray} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
