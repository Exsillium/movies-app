import React from 'react';

export default function CastList({ cast, imageBaseUrl }) {
  if (cast.length === 0) return null;

  return (
    <section className="cast-section mb-5">
      <h3 className="section-title mb-4">Featured Cast</h3>
      <div className="row g-4">
        {cast.slice(0, 6).map(person => (
          <div key={person.id} className="col-sm-6 col-md-4">
            <div className="cast-card">
              <div className="cast-card-image">
                <img 
                  src={person.profile_path ? `${imageBaseUrl}${person.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                  alt={person.name}
                  loading="lazy"
                />
                <div className="cast-card-overlay">
                  <div className="cast-card-content">
                    <h5 className="cast-name">{person.name}</h5>
                    <p className="cast-character">{person.character}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}