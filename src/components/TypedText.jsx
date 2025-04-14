// TypedText.jsx
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

function TypedText() {
  const el = useRef(null);
  const typed = useRef(null); // to store the instance

  useEffect(() => {
    typed.current = new Typed(el.current, {
      strings: ['Search Movies, Series, Tv Shows 🎬', 'Search Your Favorites ❤️', 'Add to Watchlist 🔖'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
    });

    return () => {
      // Destroy instance on unmounting to clean up
      typed.current.destroy();
    };
  }, []);

  return (
    <span className="sm:text-4xl text-xl text-purple-400 font-bold h-10 " ref={el}></span>
  );
}

export default TypedText;
