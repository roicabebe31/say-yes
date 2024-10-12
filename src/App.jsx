import React, { Suspense, lazy, useState } from "react";
const LandingPage = lazy(() => import("./pages/LandingPage"));

function App() {
  return (
    <Suspense>
      <LandingPage />
    </Suspense>
  );
}

export default App;
