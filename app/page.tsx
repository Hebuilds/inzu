import { Capabilities } from "@/components/sections/capabilities";
import { Cta } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Listings } from "@/components/sections/listings";
import { Platform } from "@/components/sections/platform";
import { Stats } from "@/components/sections/stats";
import { Steps } from "@/components/sections/steps";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Platform />
        <Features />
        <Steps />
        <Listings />
        <Capabilities />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
