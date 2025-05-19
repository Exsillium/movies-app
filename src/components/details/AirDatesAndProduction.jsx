import React from 'react';

export default function AirDatesAndProduction({ details, imageBaseUrl }) {
  return (
    <>
      <div className="info-card mb-4">
        <div className="info-card-header">
          <i className="fas fa-calendar info-icon"></i>
          <h4>Air Dates</h4>
        </div>
        <div className="info-card-body">
          <div className="info-item">
            <span className="info-label">First Air Date</span>
            <span className="info-value">{new Date(details.first_air_date).toLocaleDateString()}</span>
          </div>
          {details.last_air_date && (
            <div className="info-item">
              <span className="info-label">Last Air Date</span>
              <span className="info-value">{new Date(details.last_air_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      {details.production_companies.length > 0 && (
        <div className="info-card">
          <div className="info-card-header">
            <i className="fas fa-building info-icon"></i>
            <h4>Production Companies</h4>
          </div>
          <div className="info-card-body">
            <div className="production-companies">
              {details.production_companies.map(company => (
                <div key={company.id} className="production-company">
                  <div className="production-company-image">
                    {company.logo_path ? (
                      <img 
                        src={`${imageBaseUrl}${company.logo_path}`}
                        alt={company.name}
                        className="production-company-logo"
                      />
                    ) : (
                      <div className="production-company-placeholder">{company.name.charAt(0)}</div>
                    )}
                  </div>
                  <h6 className="company-name mt-2">{company.name}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}