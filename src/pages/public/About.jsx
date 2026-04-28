import React from "react";

export default function About() {
  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2 className="section__title">About</h2>
          <div className="card">
            <p>
              Shop Bakery is a React single-page application built as a semester
              project and upgraded for the final defense.
            </p>
            <p>
              Its focus is clean architecture: reusable components, protected
              routes, custom hooks, and local persistence.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
