import { useGlobalContext } from "./context";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {
  Home,
  Error,
  Register,
  Login,
  Verify,
  Dashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
} from "./pages";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <Home /> },
  { path: "/", element: <Home /> },
  { path: "/", element: <Home /> },
]);

export default function App() {
  // const { isLoading = false } = useGlobalContext() || {}; // exotic

  const context = useGlobalContext();
  const isLoading = context?.isLoading || false;

  if (isLoading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    );
  }
  return <RouterProvider router={router} />;
}

/* 

<Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <ProtectedRoute path="/dashboard" exact>
          <Dashboard />
        </ProtectedRoute>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/user/verify-email" exact>
          <Verify />
        </Route>
        <Route path="/user/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>

*/
