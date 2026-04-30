import { useState, useEffect } from 'react';

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Querying specifically for Indian elections using NewsData.io
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${import.meta.env.VITE_NEWS_API_KEY}&q=election%20OR%20voting%20OR%20ECI&country=in&language=en`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        
        if (data.status === 'success' && data.results) {
          // Keep only the top 5 most recent articles that have an image and description
          const validNews = data.results
            .filter(article => article.description && article.title)
            .slice(0, 5);
          setNews(validNews);
        } else {
          throw new Error(data.message || 'No news found');
        }
      } catch (err) {
        console.error("News Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
}
