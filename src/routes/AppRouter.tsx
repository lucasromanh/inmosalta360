import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import PropertyList from "../pages/public/PropertyList";
import PropertyDetail from "../pages/public/PropertyDetail";
import MapView from "../pages/public/MapView";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/propiedades" element={<PropertyList />} />
      <Route path="/propiedad/:id" element={<PropertyDetail />} />
      <Route path="/mapa" element={<MapView />} />
      <Route path="/contacto" element={<div className="p-8 bg-white min-h-screen"><h1 className="text-2xl font-bold text-gray-900">Página de Contacto - En desarrollo</h1></div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;