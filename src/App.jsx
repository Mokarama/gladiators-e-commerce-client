import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from "./components/layout/Layout";
// Code Splitting (Lazy Loading)
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Explore = lazy(() => import('./pages/Explore').then(module => ({ default: module.Explore })));
const Details = lazy(() => import('./pages/Details').then(module => ({ default: module.Details })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));

// Loading Component
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" style={{borderColor: 'var(--primary-color)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite'}}></div>
  </div>
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<div className="container py-12 text-center text-2xl font-bold mt-12">404 Not Found</div>} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
