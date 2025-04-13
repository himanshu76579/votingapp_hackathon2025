import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaVoteYea, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Home.css';
import PreviousElection from './PreviousElection';

// Import all 15 images
import header1 from '../assets/header_images/header1.jpg';
import header2 from '../assets/header_images/header2.jpg';
import header3 from '../assets/header_images/header3.jpg';
import header4 from '../assets/header_images/header4.jpg';
import header5 from '../assets/header_images/header5.jpg';
import header6 from '../assets/header_images/header6.jpg';
import header7 from '../assets/header_images/header7.jpg';
import header8 from '../assets/header_images/header8.jpg';
import header9 from '../assets/header_images/header9.jpg';
import header10 from '../assets/header_images/header10.jpg';
import header11 from '../assets/header_images/header11.jpg';
import header12 from '../assets/header_images/header12.jpg';
import header13 from '../assets/header_images/header13.jpg';
import header14 from '../assets/header_images/header14.jpg';
import header15 from '../assets/header_images/header15.jpg';
import header16 from '../assets/header_images/header16.jpg';

const headerImages = [
  header1, header2, header3, header4, header5,
  header6, header7, header8, header9, header10,
  header11, header12, header13, header14, header15,header16
];

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? headerImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === headerImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'pub_80046309572f4a7ded8fddeb37968e7d6e494',
            q: 'election AND polling AND voting AND rajya sabha',
            country: 'in',
            language: 'en',
          },
        });

        const filtered = response.data.results?.filter(article =>
          /election|voting|polling|lok sabha/i.test(
            `${article.title} ${article.description}`
          )
        );

        setNews(filtered || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className="home-container">
      <div className="top-section">
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={handlePrev}>
            <FaChevronLeft />
          </button>

          <img
            src={headerImages[currentIndex]}
            alt={`Election Header ${currentIndex + 1}`}
            className="top-image horizontal-image"
          />

          <button className="carousel-btn right" onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>

        <div className="vote-promo">
          <FaVoteYea size={50} color="#007bff" />
          <p className="vote-message">Your voice matters. Make it count — Vote now!</p>
        </div>
      </div>

      <h3 className="news-heading">🗞 Latest Election News (India)</h3>

      {loading ? (
        <p className="loading-text">Loading news...</p>
      ) : (
        <>
          <div className="news-grid">
            {news.slice(0, visibleCount).map((article, index) => (
              <div key={index} className="news-card">
                <h4 className="news-title">{article.title}</h4>
                <p className="news-date">
                  {new Date(article.pubDate).toLocaleString()}
                </p>
                <p className="news-description">
                  {article.description?.slice(0, 150) || 'No description available.'}...
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  View More →
                </a>
              </div>
            ))}
          </div>

          {visibleCount < news.length && (
            <div className="view-more-wrapper">
              <button className="view-more-btn" onClick={handleViewMore}>
                View More
              </button>
            </div>
          )}

          <PreviousElection />
        </>
      )}
    </div>
  );
};

export default Home;