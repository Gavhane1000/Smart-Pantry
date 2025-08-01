import React from "react";
import "./about.css";
import pan from "../assets/pan.png";
import stroke from "../assets/stroke.png"
import step1 from "../assets/step1.png"
import step2 from "../assets/step2.png"
import step3 from "../assets/step3.png"
import step4 from "../assets/step4.png"

const steps = [
  { id: 1, name: "Choose Ingredients", role: "Let's start with what you have", image:step1},
  { id: 2, name: "Select Recipe", role: "Browse meals you can make right now", image:step2},
  { id: 3, name: "Cook With Confidence", role: "Got a doubt ? Just ask while you cook", image:step3},
  { id: 4, name: "Enjoy Your Meal", role: "You made it, time to dig in !", image:step4}
];

const Card = ({ name, role, image, index }) => (
  <div key={index} className={`card ${index % 2 ===0 ? 'up' : 'down'}`}>
    <div ><img className="step-image " src={image} alt="loading"></img></div>
    <span className="step-heading">{name}</span>
    <br></br>
    <span className="step-sub-heading">{role}</span>
  </div>
);

const about = () => {
  return (
    <>
      <div className="about">
        <div className="info">
          <div className="info-heading">
            <span>A Chef in Every</span>
            <br></br>
            <span>Tasty Meal</span>
          </div>
          <div className="info-sub-heading">
            <span>Your ingredients. Our intelligence. Delecious outcomes.</span>
          </div>
          <div className="button">
            <button
              className="recipe-btn"
              onClick={() => {
                console.log("haha");
              }}
            >
              Get Recipes
            </button>
          </div>
        </div>
        <div className="image">
          <img className="pan-image" src={pan} alt="loading..."></img>
        </div>
      </div>
      <div className="steps">
        <div className="heading-div">
          <div className="step-heading">
            <span className="allign-centre">Watch it Work</span>
            <div className="line allign-centre">
              <img className="stroke" src={stroke} alt="loading..."></img>
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card-div">
          {steps.map((steps, index) => (
            <Card key={steps.id} name={steps.name} role={steps.role} image={steps.image} index={index} />
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default about;
