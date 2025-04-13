// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>&copy; 2025 Voting App | All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const docHeight = document.documentElement.offsetHeight;

      setIsAtBottom(scrollPosition >= docHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer ${isAtBottom ? 'visible' : ''}`}>
      <p>&copy; 2025 Voting App | All rights reserved.</p>
      <p>
        📞 <a href="tel:+9135896770">Contact Us: 9135896770</a>
           <a href="tel:+8709608191"> , 8709608191</a>
           <a href="tel:+6207744810"> , 6207744810</a>
           <a href="tel:+7004494357"> , 7004494357</a>
      </p>
      <p>
        📧  <a href="mailto:amanbkp9135@gmail.com">Email: amanbkp9135@gmail.com</a>
      </p>
    </footer>
  );
};

export default Footer;
