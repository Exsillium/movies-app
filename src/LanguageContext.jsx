import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "./translations"; // your manual translation file

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Manual translation language (controls your local translations)
  const [language, setLanguage] = useState("en");

  // API language (controls the language param for API calls)
  // Initialize to the same as manual by default
  const [apiLanguage, setApiLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setLanguage(savedLang);
    setApiLanguage(savedLang);
    document.body.setAttribute("dir", savedLang === "ar" ? "rtl" : "ltr");
  }, []);

  // Get translation strings for manual translation
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,         
        setLanguage,      
        apiLanguage,      
        setApiLanguage,   
        t,                
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
