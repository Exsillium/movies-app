import React from 'react';
import translations from '../../translations';

export default function ShowInfo({ details, language }) {
  const t = translations[language] || translations.en;
  return (
    <section className="show-info-section mb-5">
      <h3 className="section-title mb-4">{t.info}</h3>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="info-card h-100">
            <div className="info-card-header">
              <i className="fas fa-film info-icon"></i>
              <h4>{t.se}</h4>
            </div>
            <div className="info-card-body">
              <div className="info-item"><span className="info-label">{t.seasons}</span><span className="info-value">{details.number_of_seasons}</span></div>
              <div className="info-item"><span className="info-label">{t.episodes}</span><span className="info-value">{details.number_of_episodes}</span></div>
              {details.episode_run_time?.length > 0 && (
                <div className="info-item"><span className="info-label">{t.runtime}</span><span className="info-value">{details.episode_run_time[0]} min</span></div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="info-card h-100">
            <div className="info-card-header">
              <i className="fas fa-info-circle info-icon"></i>
              <h4>{t.details}</h4>
            </div>
            <div className="info-card-body">
              <div className="info-item"><span className="info-label">{t.type}</span><span className="info-value">{details.type}</span></div>
              <div className="info-item"><span className="info-label">{t.originalLanguage}</span><span className="info-value">{details.original_language.toUpperCase()}</span></div>
              <div className="info-item"><span className="info-label">{t.popularity}</span><span className="info-value">{details.popularity.toFixed(1)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}