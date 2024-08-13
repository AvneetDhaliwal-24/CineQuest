import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Navbarfooter.module.css';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

// Header Component
function Header() {

  const [search, setSearch] = useState("movie");

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const router = useRouter();
  function handleOnClick(e) {
    router.push(`/movies/${e.target.parentNode.id}/${search}`)
  }

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/${search}?query=${query}&include_adult=false&language=en-US&page=1&api_key=bbf27237d8e9e816091000c5ecff1b72`);

        const data = await response.json();
        setResults(data.results.map(({ id, title, poster_path, backdrop_path }) => ({ id, title, poster_path, backdrop_path })));

        setResults(data.results.map(result => ({ id: result.id, title: search === "tv" ? result.name : result.title, poster_path: result.poster_path, backdrop_path: result.backdrop_path })));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchResults();
  }, [query]);


  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CineQuest</h1>
      <div>
        <div className={styles.searchBar}>
          <select value={search} onChange={(e) => { setSearch(e.target.value) }}>
            <option value="movie">Movie</option>
            <option value="tv">TV Shows</option>
          </select>

          {/* onBlur={ () => setIsDropdownVisible(false)} onFocus={ () => setIsDropdownVisible(true)} */}
          <input type="text" placeholder="Search..." className={styles.searchInput} onKeyDown={(e) => setQuery(e.target.value)} />
        </div>
        {/* {
          isDropdownVisible && ( */}
        <ul className={styles.resultsList}>
          {results.map((item, index) => (
            <li onClick={handleOnClick} key={index} id={item.id} className={styles.resultsItem}><img style={{ height: '100px', width: '100px' }} src={`http://image.tmdb.org/t/p/w500${item.poster_path ? item.poster_path : item.backdrop_path}`} /><span style={{ paddingLeft: "5px" }}>{item.title}</span></li>
          ))}
        </ul>
        {/* )} */}
      </div>
    </header>
  )
};

// Navigation Bar Component
export const NavigationBar = () => (
  <nav className={styles.navigationBar}>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <Link href="/recently-released" className={styles.navLink}>Recently Released</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/movies" className={styles.navLink}>Movies</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/tv-shows" className={styles.navLink}>TV Shows</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/top-rated" className={styles.navLink}>Top Rated</Link>
      </li>
    </ul>
  </nav>
);

// Footer Component
export const Footer = () => (
  <footer className={styles.footer}>
    <p>© 2024 CineQuest. All rights reserved.</p>
  </footer>
);


export default Header;
