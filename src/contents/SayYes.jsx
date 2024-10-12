import React, { Fragment, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Picture from "../components/Picture";
import Button from "../components/Button";
import RandomPopup from "../components/RandomPopup";
import LoadingScreen from "../components/LoadingScreen";
import photos from "../assets/images";

import Question from "../assets/images/question.png";
import Question1 from "../assets/images/question-1.png";
import Question2 from "../assets/images/question-2.png";
import Question3 from "../assets/images/question-3.png";
import YesResponseImage from "../assets/images/happy.png";

const SayYes = () => {
  const [loading, setLoading] = useState(true);
  const [noClicks, setNoClicks] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [visibleImages, setVisibleImages] = useState([]);
  const [loadedPhotos, setLoadedPhotos] = useState([]);

  const images = [Question, Question1, Question2, Question3, YesResponseImage];

  const preloadImages = () => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // Resolve with null in case of error
      });
    });

    return Promise.all(imagePromises);
  };

  const preLoadPhotos = () => {
    const photoPromises = [];

    for (let i = 1; i <= 31; i++) {
      photoPromises.push(
        new Promise((resolve) => {
          const img = new Image();
          img.src = photos[`photo${i}`];
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null); // Resolve with null in case of error
        })
      );
    }

    return Promise.all(photoPromises);
  };

  useEffect(() => {
    Promise.all([preloadImages(), preLoadPhotos()]).then((results) => {
      const [loadedImages, loadedPhotos] = results;
      setLoadedImages(loadedImages.filter((img) => img)); // Filter out null values
      setLoadedPhotos(loadedPhotos.filter((img) => img)); // Filter out null values
      setLoading(false); // Set loading to false when all images are loaded
    });

    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  const handleNoClick = () => {
    if (noClicks < 3) {
      setNoClicks(noClicks + 1);
      setImageIndex((imageIndex + 1) % images.length);
    }
  };

  const handleYesClick = () => {
    setYesClicked(true);
    launchConfetti();
  };

  const launchConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
      } else {
        confetti({
          particleCount: 100,
          angle: Math.random() * 60 + 90,
          spread: 70,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      }
    }, 100);
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <>
            <Picture
              image={
                yesClicked
                  ? loadedImages[loadedImages.length - 1]?.src
                  : loadedImages[imageIndex]?.src
              }
            />
            <div className="headline">
              {yesClicked ? (
                <div>
                  <h1>She said YES!</h1>
                  <h2>{currentDate}</h2>
                </div>
              ) : (
                <h1>Will you be my Girlfriend?</h1>
              )}
            </div>
            {yesClicked && (
              <RandomPopup
                visibleImages={visibleImages}
                setVisibleImages={setVisibleImages}
                loadedPhotos={loadedPhotos}
              />
            )}
            {!yesClicked && (
              <div className="button-group">
                <Button
                  className="yes-button"
                  text="Yes"
                  onClick={handleYesClick}
                  style={{ transform: `scale(${1 + noClicks * 0.2})` }}
                />

                <Button
                  className="no-button"
                  text="No"
                  onClick={handleNoClick}
                  style={{ marginLeft: `${noClicks * 20}px` }}
                />
              </div>
            )}
          </>
        </div>
      )}
    </Fragment>
  );
};

export default SayYes;
