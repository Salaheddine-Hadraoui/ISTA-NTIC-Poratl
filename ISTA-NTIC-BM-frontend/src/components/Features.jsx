import { BookOpen, Clock, GraduationCap, Users } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';

export default function Features() {
  return (
    <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Points Forts</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez ce qui fait la force de notre institut et pourquoi nos étudiants réussissent dans leur carrière
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
              <GraduationCap className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Formation Spécialisée</h3>
              <p className="text-gray-600">Formation technique et professionnelle de haute qualité</p>
              <Link to={"/courses"} className='hidden group-hover:block underline text-blue-400' > Voir nos cours</Link>
            </div>
            <div className="text-center p-6 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
              <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">2 Ans de Formation</h3>
              <p className="text-gray-600">Programme complet sur quatre semestres</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stage Pratique</h3>
              <p className="text-gray-600">Expérience pratique en entreprise</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300">
              <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pédagogie Moderne</h3>
              <p className="text-gray-600">Approche pratique et interactive</p>
            </div>
          </div>
        </div>
      </section>

  )
}
