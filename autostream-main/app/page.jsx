import { Header } from "./_components/header";
import { CategorySideBar } from "./_components/category";
import { CarDisplay } from "./_components/car-display";
import LandingPageComponent from "./_components/landing-page-component";

export default function Home() {
  return (
    <div>
      <div className="sticky top-0 bg-white z-20">
        <Header />
      </div>

      <div>
        <LandingPageComponent />
      </div>

      
    </div>
  );
}
