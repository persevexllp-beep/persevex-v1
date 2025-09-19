import { Suspense } from "react";
import LandingPage from "../components/LandingPage";



export default function Page() {
  return (
    <Suspense>
      <LandingPage />
    </Suspense>
  );
}