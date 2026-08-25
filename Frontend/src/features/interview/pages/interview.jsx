import React, { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useinterview";


function Interview() {
  // Temporary UI data.
  // Replace this with data from your State/API layer later.

  const [activeTab, setActiveTab] = useState("technical");
  const {report} = useInterview()
  const tabs = [
    {
      id: "technical",
      label: "Technical Questions",
      count: report.technicalQuestions.length
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      count: report.behavioralQuestions.length
    },
    {
      id: "roadmap",
      label: "7-Day Roadmap",
      count: report.preparationPlan.length
    }
  ];

  const renderQuestions = (questions) => {
    return (
      <div className="questions-grid">
        {questions.map((item, index) => (
          <article className="question-card" key={index}>
            <div className="question-card-header">
              <span>QUESTION {String(index + 1).padStart(2, "0")}</span>
              <div className="question-index">{index + 1}</div>
            </div>

            <h2>{item.question}</h2>

            <div className="question-details">
              <div className="detail-block intention">
                <h4>What the interviewer is assessing</h4>
                <p>{item.intention}</p>
              </div>

              <div className="detail-block answer">
                <h4>Suggested answer</h4>
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <main className="interview">
      <div className="interview-dashboard">

        {/* HEADER */}

        <header className="interview-header">
          <div className="header-content">
            <div className="header-label">
              PERSONALIZED INTERVIEW PLAN
            </div>

            <h1>{report.title}</h1>

            <p>
              Your personalized interview preparation strategy based on
              the job requirements and your profile.
            </p>
          </div>

          <div className="match-score">
            <div className="score-circle">
              <strong>{report.matchScore}</strong>
              <span>%</span>
            </div>

            <div className="score-text">
              <span>Overall Match</span>
              <strong>Good Match</strong>
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT */}

        <div className="dashboard-body">

          {/* LEFT NAVIGATION */}

          <aside className="dashboard-navigation">
            <div className="navigation-title">
              INTERVIEW PLAN
            </div>

            <nav>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={
                    activeTab === tab.id
                      ? "navigation-item active"
                      : "navigation-item"
                  }
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="navigation-label">
                    {tab.label}
                  </span>

                  <span className="navigation-count">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>

            <div className="navigation-footer">
              <span>PREPARATION STATUS</span>

              <div className="progress-track">
                <div
                  className="progress-value"
                  style={{
                    width: `${report.matchScore}%`
                  }}
                />
              </div>

              <strong>
                {report.matchScore}% Profile Match
              </strong>
            </div>
          </aside>

          {/* MAIN CONTENT */}

          <section className="dashboard-content">

            {activeTab === "technical" && (
              <>
                <div className="section-header">
                  <div>
                    <span className="section-label">
                      TECHNICAL PREPARATION
                    </span>

                    <h2>Technical Questions</h2>

                    <p>
                      Practice these questions to prepare for the
                      technical areas most relevant to the role.
                    </p>
                  </div>

                  <span className="section-count">
                    {report.technicalQuestions.length} QUESTIONS
                  </span>
                </div>

                {renderQuestions(
                  report.technicalQuestions
                )}
              </>
            )}

            {activeTab === "behavioral" && (
              <>
                <div className="section-header">
                  <div>
                    <span className="section-label">
                      BEHAVIORAL PREPARATION
                    </span>

                    <h2>Behavioral Questions</h2>

                    <p>
                      Prepare clear examples that demonstrate your
                      communication, teamwork, and problem-solving
                      abilities.
                    </p>
                  </div>

                  <span className="section-count">
                    {report.behavioralQuestions.length} QUESTIONS
                  </span>
                </div>

                {renderQuestions(
                  report.behavioralQuestions
                )}
              </>
            )}

            {activeTab === "roadmap" && (
              <>
                <div className="section-header">
                  <div>
                    <span className="section-label">
                      PREPARATION STRATEGY
                    </span>

                    <h2>7-Day Preparation Roadmap</h2>

                    <p>
                      A focused daily plan designed to strengthen your
                      skills before the interview.
                    </p>
                  </div>

                  <span className="section-count">
                    7 DAYS
                  </span>
                </div>

                <div className="roadmap-grid">
                  {report.preparationPlan.map((plan) => (
                    <article
                      className="roadmap-card"
                      key={plan.day}
                    >
                      <div className="roadmap-day">
                        <span>DAY</span>
                        <strong>{plan.day}</strong>
                      </div>

                      <div className="roadmap-content">
                        <h3>{plan.focus}</h3>

                        <ul>
                          {plan.tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}

          </section>

          {/* RIGHT SKILL GAPS */}

          <aside className="skills-sidebar">
            <div className="skills-header">
              <span>FOCUS AREAS</span>
              <h3>Skill Gaps</h3>

              <p>
                These areas need additional attention before your
                interview.
              </p>
            </div>

            <div className="skill-list">
              {report.skillGaps.map((gap, index) => (
                <article
                  className={`skill-item ${gap.severity}`}
                  key={index}
                >
                  <div className="skill-indicator" />

                  <div>
                    <span className="severity">
                      {gap.severity} priority
                    </span>

                    <h4>{gap.skill}</h4>
                  </div>
                </article>
              ))}
            </div>

            <div className="skills-tip">
              <span>PREPARATION TIP</span>

              <p>
                Prioritize high-impact skill gaps first, then use the
                roadmap to structure your preparation.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default Interview;