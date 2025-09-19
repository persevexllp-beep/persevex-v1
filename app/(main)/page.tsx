// app/(main)/page.tsx
import { Suspense } from "react";
import LandingPage from "../components/LandingPage";

// You can create a more sophisticated loading component if you wish
const LoadingFallback = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'black',
      color: 'white'
    }}>
      Loading...
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LandingPage />
    </Suspense>
  );
}