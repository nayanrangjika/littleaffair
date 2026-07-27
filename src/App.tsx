/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingButtons } from './components/layout/FloatingButtons';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Stay } from './pages/Stay';
import { Experiences } from './pages/Experiences';
import { Places } from './pages/Places';
import { Weather } from './pages/Weather';
import { Dining } from './pages/Dining';
import { Recreation } from './pages/Recreation';
import { Gallery } from './pages/Gallery';
import { Book } from './pages/Book';
import { PlaceholderPage } from './pages/Placeholder';
import { ExperienceDetails } from './pages/ExperienceDetails';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { CancellationPolicy } from './pages/CancellationPolicy';
import { NotFound } from './pages/NotFound';
import { ThankYou } from './pages/ThankYou';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/experiences/:id" element={<ExperienceDetails />} />
            <Route path="/places" element={<Places />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/recreation" element={<Recreation />} />
            <Route path="/book" element={<Book />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}
