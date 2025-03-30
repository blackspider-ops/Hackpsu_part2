import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Button } from '@/components/ui/button';

const Root = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-tuktuk to-tuktuk-light">
      <nav className="p-6 flex justify-between items-center">
        <Logo size="lg" withText animated />
        <div className="space-x-4">
          <Button 
            className="bg-white text-tuktuk hover:bg-gray-100 px-8 py-6 text-lg"
            onClick={() => navigate('/home')}
          >
            Get Started
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16 text-white">
        {/* About Us Section */}
        <section className="mb-20">
          <div className="flex flex-row items-start gap-8 mb-6">
            <img src="/about-us.svg" alt="About TUK TUK" className="w-48 rounded-lg shadow-xl" />
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4">About TUK TUK</h2>
              <p className="text-xl max-w-3xl">
                Born from the need for sustainable campus transportation, TUK TUK revolutionizes student mobility 
                through shared rides and community connections. Our platform combines modern technology with 
                eco-conscious values to create a smarter way to travel.
              </p>
            </div>
          </div>

</section>

        {/* Business Strategy */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-6">Business Strategy: 
                                                 Freemium Model
</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Future Transaction Fees</h3>
              <p>A small commission on each ride to sustain operations.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">University Partnerships
              </h3>
              <p>Licensing Tuk Tuk as an official student transportation solution.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Brand Collaborations</h3>
              <p>Sponsored content and partnerships with student-friendly brands (food, travel, etc.).</p>
            </div>
          </div>
        </section>

        {/* Evolution from Carpool */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-6">Bringing Back a Lost Trend with Innovation          </h2>
          <p>Carpooling was once a dominant mode of transportation, peaking in the 1970s with a 20.4% share of commutes in the U.S. However, due to the rise of private vehicle ownership, declining trust, and the lack of a structured system, carpooling saw a steady decline, reaching just 9.7% by 2011.

While the concept of carpooling faded, the need for affordable, safe, and sustainable transportation never went away. Ride-sharing apps like Uber and Lyft attempted to fill the gap, but they introduced new problems—high fares, security concerns, and a lack of community-driven solutions.

Tuk Tuk redefines and modernizes carpooling, addressing the shortcomings of past models while integrating cutting-edge technology and trust-based authentication to make it viable for today's students.
          </p>
          <br></br>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <p className="text-xl mb-4">
              Timeless Tech: Reviving the Past, Building the Future

              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Real-time ride matching (tech-driven efficiency)
</li>
                <li>Secure authentication (trust-building)</li>
                <li>Networking as a core feature (community-driven growth)</li>
                <li>Social features for community building</li>
              </ul>
            </div>
            <div className="flex-1 bg-white/10 p-6 rounded-xl">
              <img src="/Home_icon.svg" alt="Evolution" className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8">Have questions or suggestions? We'd love to hear from you!</p>
          <Button 
            className="bg-white text-tuktuk px-8 py-6 text-lg hover:bg-gray-100"
            onClick={() => window.location.href = 'mailto:contact@tuktuk.app'}
          >
            Contact Us
          </Button>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-tuktuk/90 text-white py-8 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <Logo size="md" withText />
          <div className="mt-4 md:mt-0 space-y-2 text-center md:text-right">
            <p className="text-sm">Contact: customer-service@tuktuk.com</p>
            <div className="flex space-x-4 justify-center md:justify-end">
              <a href="#" className="hover:text-tuktuk-light">Twitter</a>
              <a href="#" className="hover:text-tuktuk-light">Instagram</a>
              <a href="#" className="hover:text-tuktuk-light">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Root;