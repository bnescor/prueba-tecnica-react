import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { dataSlider } from "./lib/navbarData";
import { ComingSoon } from "./pages/ComingSoon";
import { PrivateLayout } from "./routes/PrivateLayout";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";

function App() {
  const FilterDataSlider = dataSlider.filter(
    (item) => item.href !== "/" && item.href !== "/champions"
  );
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/champions"
            element={<Navigate to="/champions/1" replace />}
          />
          <Route path="/champions/:page" element={<Category />} />
          {FilterDataSlider.map((item) => (
            <Route
              key={item.href}
              path={item.href}
              element={<ComingSoon title={item.name} />}
            />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
