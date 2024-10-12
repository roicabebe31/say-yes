import React, { Suspense, lazy, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
const LandingPage = lazy(() => import("./pages/LandingPage"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LandingPage />
    </Suspense>
  );
}

export default App;
