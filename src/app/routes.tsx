import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import PageTransition from "./PageTransition";
import HomePage from "@/pages/HomePage";
import ScenariosPage from "@/pages/ScenariosPage";
import StigmasPage from "@/pages/StigmasPage";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/scenarios"
          element={
            <PageTransition>
              <ScenariosPage />
            </PageTransition>
          }
        />
        <Route
          path="/scenarios/:id"
          element={
            <PageTransition>
              <ScenariosPage />
            </PageTransition>
          }
        />
        <Route
          path="/stigmas"
          element={
            <PageTransition>
              <StigmasPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
