// src/newsService.js

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchHealthNews = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=health&country=us&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return {
      articles: data.articles,
      totalResults: data.totalResults,
    };
  } catch (error) {
    console.error('Error fetching health news:', error);
    throw error;
  }
};
