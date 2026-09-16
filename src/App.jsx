import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import Pains from './components/Pains/Pains';
import Method from './components/Method/Method';
import Services from './components/Services/Services';
import Results from './components/Results/Results';
import Testimonials from './components/Testimonials/Testimonials';
import Faq from './components/Faq/Faq';
import LeadSection from './components/LeadSection/LeadSection';
import Footer from './components/Footer/Footer';
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Stats />
        <Pains />
        <Method />
        <Services />
        <Results />
        <Testimonials />
        <Faq />
        <LeadSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
