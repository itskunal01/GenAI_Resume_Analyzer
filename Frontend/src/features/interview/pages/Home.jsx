import React from "react";
import "../style/home.scss";

const Home = () => {
  return (
    <main className="home">
      <h1>
        Create Your Custom <span>Interview Plan</span>
      </h1>

      <p>
        Let our AI analyze the job requirements and your unique profile to
        <br />
        build a winning strategy.
      </p>

      <div className="interview-input-group">
        <div className="left">
          <label htmlFor="jobDescription">Job Description</label>

          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder={
              "Paste the full job description here...\n" +
              "e.g. 'Senior Frontend Engineer at Google requires\n" +
              "proficiency in React, TypeScript, and large-scale system\n" +
              "design...'"
            }
          />
        </div>

        <div className="right">
          <div className="input-group">
            <p>
              Upload Resume{" "}
              <small className="highlight">BEST RESULTS</small>
            </p>

            <label className="file-label" htmlFor="resume">
              Upload Resume
            </label>

            <input
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription">
              Quick Self-Description
            </label>

            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            />
          </div>

          <button className="button primary-button" type="button">
            Generate My Interview Strategy
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;