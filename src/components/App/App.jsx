import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, RestrictedRoute } from "./RestrictedRoute.jsx";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedLayout from "../SharedLayout/SharedLayout.jsx";
import Loader from "../Loader/Loader.jsx";
import { selectLoading, selectError } from "../../redux/shop/selectors.js";
import { HelmetProvider } from "react-helmet-async";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import Description from "../Product/Description/Description.jsx";
import Reviews from "../Product/Reviews/Reviews.jsx";

const RegisterPage = lazy(() =>
  import("../../pages/RegisterPage/RegisterPage.jsx")
);
const LoginPage = lazy(() => import("../../pages/RegisterPage/LoginPage.jsx"));

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const MedicinePage = lazy(() =>
  import("../../pages/MedicinePage/MedicinePage.jsx")
);
const ShopPage = lazy(() => import("../../pages/ShopPage/ShopPage.jsx"));
const CreateShopPage = lazy(() =>
  import("../../pages/EditShopPage/CreateShopPage.jsx")
);
const StatisticsPage = lazy(() =>
  import("../../pages/StatisticsPage/StatisticsPage.jsx")
);
const EditShopPage = lazy(() =>
  import("../../pages/EditShopPage/EditShopPage.jsx")
);
const DrugStore = lazy(() => import("../Products/DrugStore.jsx"));
const AllMedicine = lazy(() => import("../Products/AllMedicine.jsx"));
export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <div>
      <HelmetProvider>
        <SharedLayout>
          {loading && <Loader />}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute component={<HomePage />} redirectTo="/shop" />
                }
              />
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    component={<RegisterPage />}
                    redirectTo="/create-shop"
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    component={<LoginPage />}
                    redirectTo="/shop"
                  />
                }
              />

              <Route
                path="/"
                element={
                  <PrivateRoute component={<HomePage />} redirectTo="/login" />
                }
              />

              <Route
                path="/shop"
                element={
                  <PrivateRoute component={<ShopPage />} redirectTo="/login" />
                }
              >
                <Route index element={<Navigate to="drug" replace />} />
                <Route path="drug" element={<DrugStore />} />
                <Route path="allmedicine" element={<AllMedicine />} />
              </Route>

              <Route
                path="/create-shop"
                element={
                  <PrivateRoute
                    component={<CreateShopPage />}
                    // redirectTo="/login"
                  />
                }
              />
              <Route
                path="/edit-shop"
                element={
                  <PrivateRoute
                    component={<EditShopPage />}
                    // redirectTo="/login"
                  />
                }
              />
              <Route
                path="/medicine"
                element={
                  <PrivateRoute
                    component={<MedicinePage />}
                    redirectTo="/login"
                  />
                }
              >
                <Route index element={<Navigate to="description" replace />} />
                <Route path="description" element={<Description />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
              <Route
                path="/statistics"
                element={
                  <PrivateRoute
                    component={<StatisticsPage />}
                    redirectTo="/login"
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </SharedLayout>
      </HelmetProvider>
    </div>
  );
}
