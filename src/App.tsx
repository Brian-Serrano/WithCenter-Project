import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import BlogsList from "./pages/BlogsList";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import DeleteBlog from "./pages/DeleteBlog";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Registration />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <BlogsList />
    },
    {
      path: "/create-blog",
      element: <CreateBlog />
    },
    {
      path: "/update-blog",
      element: <UpdateBlog />
    },
    {
      path: "/delete-blog",
      element: <DeleteBlog />
    },
    {
      path: "*",
      element: <div><h2>Page Not Found</h2><p>Invalid URL</p></div>
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
