import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import './designing/home.css'; // Importing the CSS file

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [err, setErr] = useState("");
  const [darkTheme, setDarkTheme] = useState(false); // State to toggle theme

  const navigate = useNavigate();

  const emailCheck = /^[A-Za-z0-9]+[A-Za-z0-9._%-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  let handlesubmit = (e) => {
    e.preventDefault();
    if (!email.match(emailCheck)) {
      setErr("Enter a valid email");
    } else {
      axios
        .post("http://localhost:9000/done", { name, email, feedback }, { withCredentials: true })
        .then((Response) => {
          console.log(Response.data);
          if (Response.data === "success") {
            setSubmitted("Feedback submitted! Thank you.");
          }
        })
        .catch((Error) => {
          console.log(Error);
        });
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={`container ${darkTheme ? "dark" : "light"}`}>
      <h2 className="text-center mb-4">Feedback Form</h2>
      <form onSubmit={(e) => handlesubmit(e)} className="feedback-form">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter your name"
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter your email"
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="error">{err}</span>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Please give your feedback"
            required
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group text-center">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
      <div className="text-center mt-3">
        {submitted && <p className="alert alert-success">{submitted}</p>}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
          Admin View
        </button>
      </div>

      {/* Theme Toggle Button */}
      <div className="text-center mt-3">
        <button className="btn btn-info" onClick={toggleTheme}>
          Switch to {darkTheme ? "Light" : "Dark"} Theme
        </button>
      </div>
    </div>
  );
}

export default Home;
