import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Signin from "../pages/Signin";
import Signup from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AddService from "../pages/AddService";
import AdminServices from "../pages/AdminServices";
import AdminOrders from "../pages/AdminOrders";
import AdminProfile from "../pages/AdminProfile";
import Dashboard from "../pages/Dashboard";
import EditService from "../pages/EditService";
import ProgrammingTech from "../pages/ProgrammingTech";
import SubCategory from "../pages/SubCategory";
import GraphicsDesign from "../pages/GraphicsDesign";
import DigitalMarketing from "../pages/DigitalMarketing";
import VideoAnimation from "../pages/VideoAnimation";
import Business from "../pages/Business";
import WritingTranslation from "../pages/WritingTranslation";
import SingleService from "../pages/SingleService";
import Message from "../components/Message";
import Messages from "../components/Messages";
import SearchResult from "../pages/SearchResult";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute requiresAuth={false}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="messages/:id" element={<Message />} />
        <Route path="messages" element={<Messages />} />
        <Route path="services" element={<Services />} />
        <Route path="programming-tech" element={<ProgrammingTech />} />
        <Route path="programming-tech/:subCategory" element={<SubCategory />} />
        <Route path="graphics-design" element={<GraphicsDesign />} />
        <Route path="graphics-design/:subCategory" element={<SubCategory />} />
        <Route path="digital-marketing" element={<DigitalMarketing />} />
        <Route
          path="digital-marketing/:subCategory"
          element={<SubCategory />}
        />
        <Route path="video-animation" element={<VideoAnimation />} />
        <Route path="Video-animation/:subCategory" element={<SubCategory />} />
        <Route path="business" element={<Business />} />
        <Route path="business/:subCategory" element={<SubCategory />} />
        <Route path="writing-translation" element={<WritingTranslation />} />
        <Route
          path="writing-translation/:subCategory"
          element={<SubCategory />}
        />
        <Route path=":subCategory/:id" element={<SingleService />} />
        <Route path="search" element={<SearchResult/>}/>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<Signin />} />
        <Route path="sign-up" element={<Signup />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiresAuth isAdminRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-service" element={<AddService />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="services/edit/:id" element={<EditService />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
