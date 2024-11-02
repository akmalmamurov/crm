import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes";
import LoginPage from "@/pages/auth/login/LoginPage";
import { PageLoader } from "@/Components/loader/index";
import { PrivateRoute } from "@/Components/private-route/PrivateRoute";
import NotFound from "@/pages/not-found/NotFound";
import { useDispatch } from "react-redux";
import { setAuth } from "./Redux/slices/authSlices";
import { TOKEN } from "./constants/api";
import RootLayout from "./layout/MainContent";

function App() {
  const { darkMode } = useSelector((state) => state.theme);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      dispatch(setAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <LoginPage />}
        />

        <Route path="/" element={<RootLayout />}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<PrivateRoute element={route.element} />}
            >
              {route.children &&
                route.children.map((subRoute, subIndex) => (
                  <Route
                    key={subIndex}
                    path={subRoute.path}
                    element={<PrivateRoute element={subRoute.element} />}
                  />
                ))}
            </Route>
          ))}
        </Route>
        <Route path="*" element={<PrivateRoute element={<NotFound />} />} />
      </Routes>
    </Suspense>
  );
}

export default App;
