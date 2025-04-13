import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About the Voting App</h1>
      <p className="intro">
        Welcome to the official <strong>Voting App</strong> — your trusted digital platform for casting votes in a secure, fair, and transparent way. Our mission is to empower citizens with a modern, safe, and accessible voting experience.
      </p>

      <section>
        <h2>How to Vote</h2>
        <ol>
          <li>Log in using your verified voter credentials.</li>
          <li>Go to the <strong>Vote</strong> section via the navigation bar.</li>
          <li>Review all candidate profiles and details.</li>
          <li>Select your candidate and click <strong>Submit Vote</strong>.</li>
          <li>Once submitted, your vote is securely encrypted and final.</li>
        </ol>
      </section>

      <section>
        <h2>Rules & Regulations</h2>
        <ul>
          <li>Only verified users can vote.</li>
          <li>Each user is allowed to vote only once.</li>
          <li>Vote manipulation, impersonation, or fraudulent activities are strictly prohibited.</li>
          <li>Votes are stored securely and are confidential.</li>
          <li>All guidelines follow the Election Commission of India.</li>
        </ul>
      </section>

      <section>
        <h2>Do's</h2>
        <ul>
          <li>Keep your login credentials secure and private.</li>
          <li>Verify your selected candidate before submitting your vote.</li>
          <li>Encourage responsible voting among your community.</li>
        </ul>
      </section>

      <section>
        <h2>Don'ts</h2>
        <ul>
          <li>Don't share your password or voter ID with anyone.</li>
          <li>Don't vote on behalf of another individual.</li>
          <li>Don't reload or close the browser while voting.</li>
        </ul>
      </section>

      <section>
        <h2>Need Help?</h2>
        <p>
          Facing any issues? Contact our support team or your local election authority.
          <br />
          <strong>Email:</strong> 
          <a
            href="mailto:amanbkp9135@gmail.com?subject=Voting%20App%20Support%20Request&body=Hi%20Team,%0A%0AI%20need%20help%20with%20the%20Voting%20App.%20Please%20assist%20me%20regarding%20..."
            className="email-link"
          >
            amanbkp9135@gmail.com
          </a>
          <br />
          <strong>Helpline:</strong> 1800-123-4567
        </p>
      </section>

      <footer className="about-footer">
        <p>Made with dedication by Aman Kumar, Rahul Kumar, Nagmani Kumar, and Himanshu Ranjan</p>
      </footer>
    </div>
  );
};

export default About;