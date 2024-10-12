import React, { Fragment, useState } from "react";
import confetti from "canvas-confetti";
import Picture from "../components/Picture";
import Button from "../components/Button";
import RandomPopup from "../components/RandomPopup";

import Question from "../assets/images/question.png";
import Question1 from "../assets/images/question-1.png";
import Question2 from "../assets/images/question-2.png";
import Question3 from "../assets/images/question-3.png";
import YesResponseImage from "../assets/images/happy.png"; // Add your Yes response image

const SayYes = () => {
  const [noClicks, setNoClicks] = useState(0); // Track number of "No" clicks
  const [imageIndex, setImageIndex] = useState(0); // Track current image index
  const [yesClicked, setYesClicked] = useState(false); // Track if "Yes" is clicked

  // Array of images for when the "No" button is clicked
  const images = [Question, Question1, Question2, Question3];

  // Handle "No" button click
  const handleNoClick = () => {
    if (noClicks < 3) {
      setNoClicks(noClicks + 1);
      setImageIndex((imageIndex + 1) % images.length); // Change image
    }
  };

  // Handle "Yes" button click
  const handleYesClick = () => {
    setYesClicked(true); // Set state to indicate "Yes" was clicked
    launchConfetti();
  };

  // Function to launch confetti
  const launchConfetti = () => {
    const duration = 3000; // Duration in milliseconds
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      // Stop when the duration is reached
      if (Date.now() > end) {
        clearInterval(interval);
      } else {
        confetti({
          particleCount: 100,
          angle: Math.random() * 60 + 90, // Random angle for more dynamics
          spread: 70,
          origin: { x: Math.random(), y: Math.random() - 0.2 }, // Random origin for more dynamics
        });
      }
    }, 100); // Launch confetti every 100 milliseconds
  };

  return (
    <Fragment>
      <div className="container">
        {/* Show YesResponseImage if "Yes" is clicked, otherwise show the current image */}
        <Picture image={yesClicked ? YesResponseImage : images[imageIndex]} />

        <div className="headline">
          {yesClicked ? (
            <h1>She said YES!</h1>
          ) : (
            <h1>Will you be my Girlfriend?</h1>
          )}
        </div>

        <div className="button-group">
          {/* The "Yes" button will grow based on noClicks */}
          <Button
            className="yes-button"
            text="Yes"
            onClick={handleYesClick} // Add onClick handler for "Yes"
            style={{ transform: `scale(${1 + noClicks * 0.2})` }} // Increase size on each "No" click
          />
          {/* The "No" button will move right based on noClicks */}
          {!yesClicked && (
            <Button
              className="no-button"
              text="No"
              onClick={handleNoClick}
              style={{ marginLeft: `${noClicks * 20}px` }} // Increase margin-left based on noClicks
            />
          )}

          {yesClicked && <RandomPopup />}
        </div>
      </div>
    </Fragment>
  );
};

export default SayYes;
