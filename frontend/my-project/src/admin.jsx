import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';  
import "./designing/admin.css"

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    
    axios.get('https://feedbackone.onrender.com/admin')
      .then((response) => {
        setFeedbacks(response.data);  
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-primary">User Feedbacks</h4>
          <div className="feedback-list">
            {feedbacks.length === 0 ? (
              <p>No feedbacks available.</p>
            ) : (
              feedbacks.map((feedback, index) => (
                <div className="feedback-item animate__animated animate__fadeIn" key={index}>
                  <h5 className="font-weight-bold">{feedback.name}</h5>
                  <p><strong>Email:</strong> {feedback.email}</p>
                  <p><strong>Feedback:</strong> {feedback.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
