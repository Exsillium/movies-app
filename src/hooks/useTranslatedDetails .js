import { useEffect, useState } from "react";
import fetcher from "../swr/fetcher"; 

export default function useTranslatedDetails(mediaType, id, language) {
  const [translated, setTranslated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || !mediaType) return;

    if (language === "en") {
      setTranslated(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetcher
      .get(`/${mediaType}/${id}?language=${language}`)
      .then((data) => {
        if (data.status_code) {
          setError(data.status_message || "Error fetching translation");
          setTranslated(null);
        } else {
          setTranslated(data);
        }
      })
      .catch((err) => {
        setError(err.message);
        setTranslated(null);
      })
      .finally(() => setLoading(false));
  }, [mediaType, id, language]);

  return { translated, loading, error };
}
