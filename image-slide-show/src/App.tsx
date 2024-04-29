import { useEffect, useState } from "react";

import "./App.css";

type Image = {
  url: string;
  alt: string;
};

const images: Image[] = [
  {
    url: "https://source.unsplash.com/1600x900/?nature",
    alt: "nature",
  },
  {
    url: "https://source.unsplash.com/1600x900/?water",
    alt: "water",
  },
  {
    url: "https://source.unsplash.com/1600x900/?mountain",
    alt: "mountain",
  },
  {
    url: "https://source.unsplash.com/1600x900/?forest",
    alt: "forest",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAutoPlay) {
        handleNext();
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentIndex, isAutoPlay]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slideshow-container">
      {/* hero image */}
      <div className="hero-image">
        <img src={images[currentIndex].url} alt={images[currentIndex].alt} />
        <button onClick={handlePrev} className="prev">
          &#10094;
        </button>
        <button onClick={handleNext} className="next">
          &#10095;
        </button>
      </div>

      {/* thumbnails */}
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            onClick={() => handleThumbnailClick(index)}
            key={image.url}
            src={image.url}
            alt={image.alt}
            className={`thumbnail ${currentIndex === index ? "active" : ""}`}
          />
        ))}
      </div>

      {/* autoplay */}
      <div className="toggle">
        <label>
          Autoplay:{" "}
          <input
            type="checkbox"
            checked={isAutoPlay}
            onChange={() => setIsAutoPlay(!isAutoPlay)}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
