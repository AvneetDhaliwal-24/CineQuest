import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import noImage from '../styles/no_img.jpg';
import styles from "@/styles/homepage.module.css";

import dotenv from "dotenv";

export default function HomePage() {
  return (
    <>
      <MoviesTVShows about="movie" page={1} title="Recently Released Movies" pageName="now_playing"/>
      <MoviesTVShows about="movie" page={1} title="Top Rated Movies" pageName="top_rated"/>
      <MoviesTVShows about="movie" page={3} title="Movies" pageName="popular"/>
      <MoviesTVShows about="tv" page={1} title="Recently Released TV Shows" pageName="airing_today"/>
      <MoviesTVShows about="tv" page={1} title="Top Rated TV Shows" pageName="top_rated"/>
      <MoviesTVShows about="tv" page={3} title="TV Shows" pageName="popular"/>  
    </>
  );
}

function MoviesTVShows(props) {


  dotenv.config();

  const [itemsList, setitemsList] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {

      try {
        // Fetch data from both APIs
        const [response1, response2] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${props.about}/${props.pageName}?language=en-US&page=${props.page}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`),
          fetch(`https://api.themoviedb.org/3/${props.about}/${props.pageName}?language=en-US&page=${props.page + 1}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
        ]);

        // Check if both responses are successful
        if (!response1.ok || !response2.ok) {
          throw new Error('Error in retrieving recently released movies');
        }

        // Parse JSON from both responses
        const data1 = await response1.json();
        const data2 = await response2.json();

        const mergedData = [...data1.results, ...data2.results];

        setitemsList(mergedData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <CineQuestCarousel about={props.about} title={props.title} pageName={props.pageName} list={itemsList} />
  );
}

function CineQuestCarousel(props) {
  const router = useRouter();

  function handleClick() {
    router.push('/MovieList');
  }

  //we made changes here!!

  return (
    <>
     <Link className={styles.carouselHeader} href={{
          pathname: props.about === 'tv' ? '/TVShowList/' : '/MovieList/',
          query: {filter: props.pageName}
        }}>
      <h3 onClick={handleClick}>
        {props.title}
        <svg className={styles.seeMoreArrowBtn} width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
        </svg>
      </h3>
      </Link>

      <div className={styles.slider}>
      {
        props.list.map((item, index) => <Item key={index} item={item} about={props.about} />)
      }
      </div>
    </>
  );
}


function Item(props) {
  const router = useRouter();

  function handleClick() {
    router.push(`/movies/${props.item.id}/${props.about}`);
  }

  return (
    <div className={styles.carouselItemParentDiv} onClick={handleClick}>
      <img src={(props.item.poster_path || props.item.backdrop_path) ? `http://image.tmdb.org/t/p/w500${props.item.poster_path ? props.item.poster_path : props.item.backdrop_path}` : noImage.src} />
      <div className={styles.movieInformation}>
        <div>
          <h4>{props.item.title ? props.item.title : props.item.name}</h4>
          <p>{props.item.release_date ? props.item.release_date : props.item.first_air_date}</p>
        </div>
        
        <div>
          <p>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="gold" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{props.item.vote_average.toFixed(1)}</span></p>
        </div>
      </div>
    </div>
  );
}