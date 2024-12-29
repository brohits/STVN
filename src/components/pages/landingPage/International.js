import React, {useState, useEffect} from "react";
import CardImg2 from "../../../assets/News1 17.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import "./International.css";
import { useNavigate } from "react-router-dom";

const International = () => {
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
    <div className="International">
      <div className="International-title-section">
        <h2 className="InternationalSection-title">International</h2>
        <div className="gradient-underline"></div>
      </div>
      <div className="InternationalContainer">
        {news.slice(0,4).map((article, index) => (
          <div className="InternationalCard" key={index}>
            <div className="InternationalBadge">{article.location || "सागर"}</div>
            <img
              src={CardImg2} 
              alt="Shivraj"
              className="InternationalCardImage"
            />
            <div className="InternationalCardContent">
              <h2 className="InternationalCardTitle">{article.heading}</h2>
              <p className="InternationalCardDescription">
               {article.mainNews}
              </p>
              <div className="InternationalCardFooter">
                <div className="InternationalAuthorInfo">
                  <span className="InternationalAuthor">By Abhishek Sharma</span>
                  <span className="InternationalDate">
                    <BsCalendar3 className="InternationalCalendarIcon" />
                    Nov 25, 2024 21:27 IST
                  </span>
                </div>
              </div>
              <div className="InternationalCardActions">
                <IoShareSocialOutline 
                  className="InternationalShareIcon" 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.heading,
                        text: article.mainNews,
                        url: window.location.href,
                      })
                      .catch((error) => console.log('Error sharing:', error));
                    } else {
                      const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.heading)}&category=international`;
                      navigator.clipboard.writeText(shareUrl)
                        .then(() => alert('Link copied to clipboard!'))
                        .catch((error) => console.log('Error copying to clipboard:', error));
                    }
                  }}
                />
                <a 
                  href="#" 
                  className="InternationalReadMore"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/news-detail/${article._id}`, { 
                      state: { 
                        article: article,
                        category: 'international'
                      }
                    });
                  }}
                >
                  और भी →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default International;