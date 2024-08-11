import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { Component } from "react";

const Movies = () => (
  <div className={styles.container}>
    <Head>
      <title>Movies - CineQuest</title>
      <meta name="description" content="Browse the latest movies on CineQuest." />
    </Head>
    <header className={styles.header}>
      <h1 className={styles.title}>Movies</h1>
      <Link href="/"><a className={styles.navLink}>Back to Home</a></Link>
    </header>
    <main className={styles.mainContent}>
      <h2>Movies</h2>
      <p>Here you can find information about the latest movies.</p>
    </main>
    <footer className={styles.footer}>
      <p>© 2024 CineQuest. All rights reserved.</p>
    </footer>
  </div>
);

export default Movies;
