import Header from './components/navigation/Header.jsx';
import StickyBookBar from './components/navigation/StickyBookBar.jsx';
import Hero from './sections/Hero.jsx';
import MarqueeStrip from './sections/MarqueeStrip.jsx';
import TrustBar from './sections/TrustBar.jsx';
import Signatures from './sections/Signatures.jsx';
import ServiceMenu from './sections/ServiceMenu.jsx';
import Gallery from './sections/Gallery.jsx';
import Reviews from './sections/Reviews.jsx';
import Drinks from './sections/Drinks.jsx';
import Visit from './sections/Visit.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-jade focus:px-5 focus:py-3 focus:text-foam"
      >
        Skip to services
      </a>
      <Header />
      <main>
        <Hero />
        <MarqueeStrip />
        <TrustBar />
        <Signatures />
        <ServiceMenu />
        <Gallery />
        <Reviews />
        <Drinks />
        <Visit />
      </main>
      <Footer />
      <StickyBookBar />
    </>
  );
}
