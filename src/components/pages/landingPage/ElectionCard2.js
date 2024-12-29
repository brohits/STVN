import React, {useState, useEffect} from "react";
import "./ElectionCard2.css";
import CardImg2 from "../../../assets/News1 17.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ElectionCard2 = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch(
            "https://news-backend-production-ae21.up.railway.app/api/news"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch news.");
          }
          const data = await response.json();
          setNews(data || []); // Set the entire data array or empty array if null
        } catch (err) {
          setError(err.message);
          setNews([]); // Set empty array on error
        } finally {
          setLoading(false);
        }
      };
  
      fetchNews();
    }, []);
  
    if (loading) return <p>Loading news...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!news || news.length === 0) return <p>No news articles available.</p>;
  return (
    news.slice(2, 5).map((article, index) => (
    <div className="card2"key={index}>
      <div className="badge2">{article.location || "सागर"}</div>
      <img
        src={CardImg2} // Replace with the image source
        alt="Shivraj"
        className="card-image2"
      />
      <div className="card-content2">
        <h2 className="card-title2">{article.heading}</h2>
        <p className="card-description2">
         {article.mainNews}
        </p>
        <div className="card-footer2">
          <div className="author-info2">
            <span className="author2">By Abhishek Sharma</span>
            <span className="date2">
              <BsCalendar3 className="calendar-icon2" />
              Nov 25, 2024 21:27 IST
            </span>
          </div>
        </div>
        <div className="card-actions2">
          <IoShareSocialOutline 
            className="share-icon2" 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: article.heading,
                  text: article.mainNews,
                  url: window.location.href,
                })
                .catch((error) => console.log('Error sharing:', error));
              } else {
                // Fallback for browsers that don't support Web Share API
                const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.heading)}&category=election2`;
                navigator.clipboard.writeText(shareUrl)
                  .then(() => alert('Link copied to clipboard!'))
                  .catch((error) => console.log('Error copying to clipboard:', error));
              }
            }}
          />
          <a 
            href="#" 
            className="read-more2"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/news-detail/${article._id}`, { 
                state: { 
                  article: article,
                  category: 'election2'
                }
              });
            }}
          >
            और भी →
          </a>
        </div>
      </div>
    </div>

  ))
  );
};

export default ElectionCard2;
