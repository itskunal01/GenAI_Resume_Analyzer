import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useinterview";
import { useParams } from "react-router";

function Interview() {
  const [activeTab, setActiveTab] = useState("technical");

  const { report, getReportById } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  /*
   * The API data is not available immediately.
   * On the first render report can be null.
   */
  if (!report) {
    return (
      <main className="interview">
        <div className="interview-dashboard">
          <div
            style={{
              minHeight: "100dvh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
              color: "#909aa8",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                border: "3px solid #29323d",
                borderTop: "3px solid #ed176e",
                borderRadius: "50%",
                animation: "interview-spin 0.8s linear infinite",
              }}
            />

            <span
              style={{
                fontSize: "13px",
              }}
            >
              Loading interview report...
            </span>
          </div>
        </div>
      </main>
    );
  }

  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const preparationPlan = report.preparationPlan || [];
  const skillGaps = report.skillGaps || [];

  const tabs = [
    {
      id: "technical",
      label: "Technical Questions",
      count: technicalQuestions.length,
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      count: behavioralQuestions.length,
    },
    {
      id: "roadmap",
      label: "7-Day Roadmap",
      count: preparationPlan.length,
    },
  ];

  const renderQuestions = (questions) => {
    return (
      <div className="questions-grid">
        {questions.map((item, index) => (
          <article className="question-card" key={index}>
            <div className="question-card-header">
              <span>
                QUESTION {String(index + 1).padStart(2, "0")}
              </span>

              <div className="question-index">
                {index + 1}
              </div>
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

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="interview-header">
          <div className="header-content">
            <div className="header-label">
              PERSONALIZED INTERVIEW PLAN
            </div>

            <h1>{report.title || "Interview Plan"}</h1>

            <p>
              Your personalized interview preparation strategy based
              on the job requirements and your profile.
            </p>
          </div>

          <div className="match-score">
            <div className="score-circle">
              <strong>{report.matchScore || 0}</strong>
              <span>%</span>
            </div>

            <div className="score-text">
              <span>Overall Match</span>

              <strong>
                {report.matchScore >= 80
                  ? "Excellent Match"
                  : report.matchScore >= 60
                  ? "Good Match"
                  : "Needs Improvement"}
              </strong>
            </div>
          </div>
        </header>

        {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

        <div className="dashboard-body">

          {/* ===================================================
              LEFT NAVIGATION
          =================================================== */}

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
                    width: `${report.matchScore || 0}%`,
                  }}
                />
              </div>

              <strong>
                {report.matchScore || 0}% Profile Match
              </strong>
            </div>
          </aside>

          {/* ===================================================
              MAIN CONTENT
          =================================================== */}

          <section className="dashboard-content">

            {/* =================================================
                TECHNICAL QUESTIONS
            ================================================= */}

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
                    {technicalQuestions.length} QUESTIONS
                  </span>
                </div>

                {renderQuestions(technicalQuestions)}
              </>
            )}

            {/* =================================================
                BEHAVIORAL QUESTIONS
            ================================================= */}

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
                    {behavioralQuestions.length} QUESTIONS
                  </span>
                </div>

                {renderQuestions(behavioralQuestions)}
              </>
            )}

            {/* =================================================
                PREPARATION ROADMAP
            ================================================= */}

            {activeTab === "roadmap" && (
              <>
                <div className="section-header">
                  <div>
                    <span className="section-label">
                      PREPARATION STRATEGY
                    </span>

                    <h2>7-Day Preparation Roadmap</h2>

                    <p>
                      A focused daily plan designed to strengthen
                      your skills before the interview.
                    </p>
                  </div>

                  <span className="section-count">
                    {preparationPlan.length} DAYS
                  </span>
                </div>

                <div className="roadmap-grid">
                  {preparationPlan.map((plan) => (
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
                          {(plan.tasks || []).map(
                            (task, index) => (
                              <li key={index}>
                                {task}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* ===================================================
              RIGHT SKILL GAPS
          =================================================== */}

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
              {skillGaps.map((gap, index) => (
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
                Prioritize high-impact skill gaps first, then use
                the roadmap to structure your preparation.
              </p>
            </div>
          </aside>

        </div>
      </div>

      <style>
        {`
          @keyframes interview-spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </main>
  );
}

export default Interview;