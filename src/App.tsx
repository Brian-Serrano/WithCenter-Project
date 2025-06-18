import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import BlogsList from "./pages/BlogsList";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import DeleteBlog from "./pages/DeleteBlog";
import Logout from "./pages/Logout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Registration />,
      loader: () => {
        if (localStorage.getItem("user_id")) {
          return redirect("/")
        }
        return null
      }
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (localStorage.getItem("user_id")) {
          return redirect("/")
        }
        return null
      }
    },
    {
      path: "/",
      element: <BlogsList />,
      loader: () => {
        if (!localStorage.getItem("user_id")) {
          return redirect("/login")
        }
        return null
      }
    },
    {
      path: "/create-blog",
      element: <CreateBlog />,
      loader: () => {
        if (!localStorage.getItem("user_id")) {
          return redirect("/login")
        }
        return null
      }
    },
    {
      path: "/update-blog/:blog_id/:user_id",
      element: <UpdateBlog />,
      loader: ({ params }) => {
        const user = localStorage.getItem("user_id")
        if (!user) {
          return redirect("/login")
        }
        // dont allow users access other's blog
        if (user != params.user_id) {
          return redirect("/")
        }
        return params.blog_id
      }
    },
    {
      path: "/delete-blog/:blog_id/:user_id",
      element: <DeleteBlog />,
      loader: ({ params }) => {
        const user = localStorage.getItem("user_id")
        if (!user) {
          return redirect("/login")
        }
        // dont allow users access other's blog
        if (user != params.user_id) {
          return redirect("/")
        }
        return params.blog_id
      }
    },
    {
      path: "/logout",
      element: <Logout />,
      loader: () => {
        if (!localStorage.getItem("user_id")) {
          return redirect("/login")
        }
        return null
      }
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
