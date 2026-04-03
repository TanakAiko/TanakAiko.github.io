import { BrowserRouter } from "react-router-dom";
import StarMap from "@/components/layout/StarMap";
import Ticker from "@/components/layout/Ticker";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GoldParticles from "@/components/ui/GoldParticles";
import MouseGlow from "@/components/ui/MouseGlow";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-orv-bg text-white relative overflow-x-hidden">
        <ScrollProgress />
        <GoldParticles />
        <MouseGlow />
        <StarMap />
        <Ticker />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
