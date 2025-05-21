import React from 'react'
import {MapPin, Phone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 uppercase">A propos de l'ESTC</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                L'Institut Spécialisé de Technologie Appliquée NTIC de Beni Mellal est un établissement public d'enseignement supérieur à finalité professionnalisante.
              </p>
            </div>
            
            {/* Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/About-us" className="text-gray-400 hover:text-white transition-colors">Présentation</Link></li>
                <li><Link to="events" className="text-gray-400 hover:text-white transition-colors">Nos événements</Link></li>
                <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Cours offerts</Link></li>
              </ul>
            </div>

            {/* Liens Utiles */}
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">Liens Utiles</h3>
              <ul className="space-y-2">
                <li className='flex justify-start gap-2 items-center'>
                    <img src="logo-myway.webp" width={"28px"} height={"auto"} alt="" />
                    <Link to="https://www.myway.ac.ma/fr" className="text-gray-400 hover:text-white transition-colors">
                        My Way
                    </Link>
                </li>
                <li><Link to="/contact-nous" className="text-gray-400 hover:text-white transition-colors">Contactez Nous</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">Contactez Nous</h3>
              <div className="space-y-3">
                <a href='https://maps.app.goo.gl/9YRf96ZWwGjdXHXNA' className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-sm">ISTA NTIC BENI MELLAL N8, Mghila 23000</span>
                </a>
                <Link to="tel:0523423760" className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="text-sm">05-23-42-37-60</span>
                </Link>
                <div className="flex items-center text-gray-400">
                  <Globe className="h-5 w-5 mr-2" />
                  <Link to="http://www.ofppt.ma/" className="text-sm hover:text-white transition-colors">Ofppt.ma</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} ISTA NTIC Beni Mellal. Tous droits réservés.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
