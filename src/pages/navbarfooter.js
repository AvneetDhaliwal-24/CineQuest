import Link from 'next/link';
import styles from '../styles/Navbarfooter.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import noImage from '../styles/no_img.jpg';

// Header Component
function Header() {

  const [search, setSearch] = useState("movie");
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showNavbar, setShowNavbar] = useState();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const router = useRouter();

  function handleOnClick(e) {
    router.push(`/movies/${e.target.parentNode.id}/${search}`)
  }

  function handleOnBlur(e) {
    e.relatedTarget && e.relatedTarget.tagName == ("UL") ? '' : setIsDropdownVisible(false);
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

  function handleMobileNavClick(e) {
    setShowNavbar((showNavbar == 'block' ? 'none' : 'block'));
  }

  useEffect(() => {
    // Function to handle screen width change
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        console.log('Screen width changed!', window.innerWidth);
        setShowNavbar('none');
      }
      else {
        setShowNavbar('block');
      }
    };

    handleResize();
    //Resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up Resize event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerFirstElement}>
          <h1 className={styles.title}>CineQuest</h1>

          <div onClick={handleMobileNavClick} className={styles.hamburgerMenu}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>

        <div>
          <div className={styles.searchBar}>
            <select value={search} onChange={(e) => { setSearch(e.target.value) }}>
              <option value="movie">Movie</option>
              <option value="tv">TV Shows</option>
            </select>

            {/* onBlur={ () => setIsDropdownVisible(false)} onFocus={ () => setIsDropdownVisible(true)} */}
            <input type="text" placeholder="Search..." className={styles.searchInput} onKeyDown={(e) => setQuery(e.target.value)} onBlur={handleOnBlur} onFocus={() => setIsDropdownVisible(true)} />
          </div>

          {
            isDropdownVisible && (
              <ul className={styles.resultsList}>
                {results.length > 0 ? (results.map((item, index) => (
                  <li onClick={handleOnClick} key={index} id={item.id} className={styles.resultsItem}><img style={{ height: '100px', width: '100px', zIndex: 999 }} src={(item.poster_path || item.backdrop_path) ? `http://image.tmdb.org/t/p/w500${item.poster_path ? item.poster_path : item.backdrop_path}` : noImage.src} /><span style={{ paddingLeft: "5px" }}>{item.title}</span></li>
                ))) : query.length > 2 ?
                  (
                    <li className={styles.resultsItem}>No results found</li>
                  ) : ""}

              </ul>
            )}
        </div>

      </header>

      <NavigationBar visible={showNavbar}/>
    </>
  )
};

// Navigation Bar Component
export const NavigationBar = (props) => (
  <nav className={styles.navigationBar} style={{display: props.visible}}>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <Link href={{
          pathname: '/MovieList/',
          query: { filter: 'now_playing' }
        }} className={styles.navLink}>Recently Released</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/MovieList" className={styles.navLink}>Movies</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/TVShowList" className={styles.navLink}>TV Shows</Link>
      </li>
      <li className={styles.navItem}>
        <Link href={{
          pathname: '/MovieList/',
          query: { filter: 'top_rated' }
        }} className={styles.navLink}>Top Rated</Link>
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
