import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

// Header Component
const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>CineQuest</h1>
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search..." className={styles.searchInput} />
    </div>
  </header>
);

// Navigation Bar Component
const NavigationBar = () => (
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
const Footer = () => (
  <footer className={styles.footer}>
    <p>© 2024 CineQuest. All rights reserved.</p>
  </footer>
);

// Main Page Component
const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>CineQuest</title>
      <meta name="description" content="Welcome to CineQuest" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <NavigationBar />
    <main className={styles.mainContent}>
      <h2>Welcome to CineQuest</h2>
      <p>This is the main content area.</p>
    </main>
    <Footer />
  </div>
);

export default Home;
