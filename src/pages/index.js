import { useEffect, useState } from 'react';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import { useRouter } from 'next/router';

import styles from "@/styles/homepage.module.css";

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

  const [itemsList, setitemsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from both APIs


        const [response1, response2] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${props.about}/${props.pageName}?language=en-US&page=${props.page}&api_key=129348eec339866757f2e116253e264c`),
          fetch(`https://api.themoviedb.org/3/${props.about}/${props.pageName}?language=en-US&page=${props.page + 1}&api_key=129348eec339866757f2e116253e264c`)
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
    <CineQuestCarousel title={props.title} list={itemsList} />
  );
}

function CineQuestCarousel(props) {
  const router = useRouter();

  function handleClick() {
    router.push('/MovieList');
  }

  let elements = [];
  for (let i = 1; i <= 35; i += 7) {
    let element = <Carousel.Item>
      <div className={styles.carouselItemsContainer}>
        {
          props.list.slice(i, i + 7).map((j) => {
            return <CarouselItem item={j} />
          })
        }
      </div>
    </Carousel.Item>;
    elements.push(element);
  }

  return (
    <>
      <h3 className={styles.carouselHeader} onClick={handleClick}>
        {props.title}
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.seeMoreArrowBtn} >
          <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
        </svg>
      </h3>
      <Carousel interval={null} indicators={false} slide={false}>
        {
          elements
        }
      </Carousel>
    </>
  );
}


function CarouselItem(props) {

  function handleClick() {
    // console.log(props.item.id);
  }

  return (
    <div className={styles.carouselItemParentDiv} onClick={handleClick}>
      <img src={"http://image.tmdb.org/t/p/w500" + (props.item.poster_path ? props.item.poster_path : props.item.backdrop_path)} />
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