import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import PropertyList from "../pages/public/PropertyList";
import PropertyDetail from "../pages/public/PropertyDetail";
import MapView from "../pages/public/MapView";
import Dashboard from "../pages/admin/Dashboard";
import AddProperty from "../pages/admin/AddProperty";
import Clients from "../pages/admin/Clients";
import Reports from "../pages/admin/Reports";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";

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
      <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin/crm" element={<PrivateRoute><Clients /></PrivateRoute>} />
      <Route path="/admin/propiedades/nueva" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
      <Route path="/admin/reportes" element={<PrivateRoute><Reports /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;