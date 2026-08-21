import React from "react";
import "../style/interview.scss";

function Interview() {
  return (
    <main className="interview">
      <div className="interview-layout">

        <aside className="interview-sidebar">
          <nav>
            <button className="nav-item active">
              Technical questions
            </button>

            <button className="nav-item">
              Behavioral questions
            </button>

            <button className="nav-item">
              Road Map
            </button>
          </nav>
        </aside>

        <section className="interview-content">
          <div className="main-content">
            here will be the main content
          </div>
        </section>

        <aside className="skill-gaps">
          <h3>Skill Gaps</h3>

          <div className="skill-list">
            <span className="skill-tag">redis</span>
            <span className="skill-tag">Message queue</span>
            <span className="skill-tag">Event loop</span>
          </div>
        </aside>

      </div>
    </main>
  );
}

export default Interview;