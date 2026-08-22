import React, { useState } from "react";
import "../style/interview.scss";

function Interview() {
  // Temporary UI data.
  // Replace this with data from your State/API layer later.
  const interviewData = {
    title: "Backend Engineer",
    matchScore: 70,

    technicalQuestions: [
      {
        question:
          "Explain the virtual DOM and how React uses it to optimize rendering.",
        intention:
          "To assess the candidate's understanding of core React.js concepts and performance optimization techniques.",
        answer:
          "The Virtual DOM is a lightweight, in-memory representation of the real DOM. When a component's state changes, React creates a new Virtual DOM tree and compares it with the previous one using a diffing algorithm. It then calculates the most efficient way to update the real DOM, applying only the necessary changes."
      },
      {
        question:
          "How do you handle asynchronous operations in Node.js, and what is the difference between Promises and async/await?",
        intention:
          "To evaluate the candidate's proficiency in asynchronous JavaScript, which is crucial for backend development in Node.js.",
        answer:
          "Asynchronous operations in Node.js can be handled using callbacks, Promises, or async/await. A Promise represents the eventual completion or failure of an asynchronous operation. Async/await is syntactic sugar built on top of Promises and improves readability and error handling with try/catch."
      },
      {
        question:
          "What is the difference between SQL and NoSQL? When would you choose MongoDB?",
        intention:
          "To test the candidate's understanding of database paradigms and MongoDB.",
        answer:
          "SQL databases are relational and table-based with structured schemas. NoSQL databases like MongoDB are document-based and flexible. MongoDB is useful when working with rapidly changing data, hierarchical structures, and applications requiring flexible schemas and horizontal scalability."
      },
      {
        question:
          "What is middleware in Express.js? Can you give an example of how you would use it?",
        intention:
          "To verify the candidate's understanding of Express.js architecture and request-response handling.",
        answer:
          "Middleware functions have access to the request, response, and next function. They can execute code, modify request or response objects, end the request-response cycle, or call the next middleware. Authentication, logging, and request validation are common examples."
      },
      {
        question:
          "Explain closures in JavaScript and how they can be useful.",
        intention:
          "To test fundamental JavaScript knowledge.",
        answer:
          "A closure allows a function to access variables from its lexical environment even after the outer function has returned. Closures are useful for maintaining state, data privacy, asynchronous callbacks, and creating function factories."
      }
    ],

    behavioralQuestions: [
      {
        question:
          "Can you describe a time when you had to work in a team and how you handled disagreements?",
        intention:
          "To assess teamwork, communication, and conflict resolution skills.",
        answer:
          "During a college project, my teammate and I disagreed on the technology choice. We discussed the advantages and disadvantages based on our timeline and team skills, then selected the option that best supported the project goals."
      },
      {
        question:
          "How do you ensure AI-generated code or solutions are accurate and secure?",
        intention:
          "To evaluate critical thinking and responsible use of AI tools.",
        answer:
          "I treat AI tools as assistants rather than absolute sources of truth. I review generated code, understand its logic, verify it against official documentation, and test it for edge cases and potential security issues."
      },
      {
        question:
          "Walk me through your process of learning a new framework quickly.",
        intention:
          "To test adaptability, self-learning, and resourcefulness.",
        answer:
          "I begin with official documentation and foundational tutorials, then build a small practical project. I apply the concepts immediately to a real problem and use documentation and technical resources to solve specific issues."
      },
      {
        question:
          "How do you manage your time when multiple deadlines and project milestones coincide?",
        intention:
          "To assess time management and prioritization.",
        answer:
          "I prioritize tasks based on urgency and importance, divide larger goals into smaller tasks, and use calendars and personal deadlines to maintain consistent progress."
      },
      {
        question:
          "Describe a difficult technical bug you encountered and how you resolved it.",
        intention:
          "To evaluate problem-solving and debugging methodology.",
        answer:
          "I trace the problem systematically using logs and by checking the request and response flow. In one project, I discovered the backend was receiving an empty request body because JSON parsing middleware was missing. Adding express.json() resolved the problem."
      }
    ],

    skillGaps: [
      {
        skill: "Professional Industry Experience",
        severity: "high"
      },
      {
        skill: "MongoDB Production Experience",
        severity: "medium"
      },
      {
        skill: "Advanced State Management",
        severity: "medium"
      }
    ],

    preparationPlan: [
      {
        day: 1,
        focus: "Core JavaScript & ES6+ Concepts",
        tasks: [
          "Review closures, scope, hoisting, and prototype inheritance.",
          "Practice asynchronous JavaScript with Promises and async/await.",
          "Solve JavaScript coding challenges."
        ]
      },
      {
        day: 2,
        focus: "React.js Fundamentals & State Management",
        tasks: [
          "Review React lifecycle and hooks.",
          "Learn Context API and Redux fundamentals.",
          "Build a small application using shared state."
        ]
      },
      {
        day: 3,
        focus: "Node.js & Express.js Backend Development",
        tasks: [
          "Understand event-driven architecture and non-blocking I/O.",
          "Build a RESTful API with Express.",
          "Implement logging and validation middleware."
        ]
      },
      {
        day: 4,
        focus: "MongoDB & Mongoose Integration",
        tasks: [
          "Study document-based database design.",
          "Connect an Express application to MongoDB.",
          "Practice schemas, models, and CRUD operations."
        ]
      },
      {
        day: 5,
        focus: "MERN Integration & Project Refactoring",
        tasks: [
          "Refactor backend data models for MongoDB.",
          "Connect React, Express, and MongoDB.",
          "Test and debug end-to-end data flow."
        ]
      },
      {
        day: 6,
        focus: "Behavioral Preparation & AI Tooling Strategy",
        tasks: [
          "Prepare STAR method stories.",
          "Practice explaining responsible AI tool usage.",
          "Conduct a self-mock interview."
        ]
      },
      {
        day: 7,
        focus: "Final Review & Mock Interview",
        tasks: [
          "Review MERN interview questions.",
          "Take a complete mock interview.",
          "Review final talking points for the role."
        ]
      }
    ]
  };

  const [activeTab, setActiveTab] = useState("technical");

  const tabs = [
    {
      id: "technical",
      label: "Technical Questions",
      count: interviewData.technicalQuestions.length
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      count: interviewData.behavioralQuestions.length
    },
    {
      id: "roadmap",
      label: "7-Day Roadmap",
      count: interviewData.preparationPlan.length
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

            <h1>{interviewData.title}</h1>

            <p>
              Your personalized interview preparation strategy based on
              the job requirements and your profile.
            </p>
          </div>

          <div className="match-score">
            <div className="score-circle">
              <strong>{interviewData.matchScore}</strong>
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
                    width: `${interviewData.matchScore}%`
                  }}
                />
              </div>

              <strong>
                {interviewData.matchScore}% Profile Match
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
                    {interviewData.technicalQuestions.length} QUESTIONS
                  </span>
                </div>

                {renderQuestions(
                  interviewData.technicalQuestions
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
                    {interviewData.behavioralQuestions.length} QUESTIONS
                  </span>
                </div>

                {renderQuestions(
                  interviewData.behavioralQuestions
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
                  {interviewData.preparationPlan.map((plan) => (
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
              {interviewData.skillGaps.map((gap, index) => (
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