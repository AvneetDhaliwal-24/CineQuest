import { useEffect, useState } from 'react';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';

export default function HomePage() {
  return (
    <>
      <RecentlyReleasedMovies  />
      <TopRatedMovies />
      <Movies />
      <RecentlyReleasedTvShows />
      <TopRatedTVShows />
      <TvShows />
    </>
  );
}

function Movies() {

  const [moviesList, setMoviesList] = useState([]);

  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&api_key=129348eec339866757f2e116253e264c';

  useEffect(() => {
    fetch(url).then(res => res.json()).then((res) => {
      // console.log(res);
      setMoviesList(res.results);

    }).catch((err) => alert(err));
  }, []);

  return (
    <CineQuestCarousel title="Movies" list={moviesList} />
  );
}

function TvShows() {

  const [tvShowsList, setTvShowsList] = useState([]);

  const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=3&api_key=129348eec339866757f2e116253e264c';

  useEffect(() => {
    fetch(url).then(res => res.json()).then((res) => {
      // console.log(res);
      setTvShowsList(res.results);

    }).catch((err) => alert(err));
  }, []);

  return (
    <CineQuestCarousel title="TV Shows" list={tvShowsList} />
  );
}

function RecentlyReleasedTvShows() {

  const [recentlyReleasedTVShowsList, setRecentlyReleasedgTVShowsList] = useState([]);

  const url = 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&api_key=129348eec339866757f2e116253e264c';

  useEffect(() => {
    fetch(url).then(res => res.json()).then((res) => {
      console.log(res);
      setRecentlyReleasedgTVShowsList(res.results);

    }).catch((err) => alert(err));
  }, []);

  return (
    <CineQuestCarousel title="Recently Released TV Shows" list={recentlyReleasedTVShowsList} />
  );
}

function TopRatedMovies() {

  const [topRatedMoviesList, setTopRatedMoviesList] = useState([]);

  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=129348eec339866757f2e116253e264c';

  useEffect(() => {
    fetch(url).then(res => res.json()).then((res) => {
      // console.log(res);
      setTopRatedMoviesList(res.results);

    }).catch((err) => alert(err));
  }, []);

  return (
    <CineQuestCarousel title="Top Rated Movies" list={topRatedMoviesList} />
  );
}

function TopRatedTVShows() {

  const [tvShowsList, setRecentlyTvShowsList] = useState([]);

  const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=129348eec339866757f2e116253e264c';

  useEffect(() => {
    fetch(url).then(res => res.json()).then((res) => {
      // console.log(res);
      setRecentlyTvShowsList(res.results);

    }).catch((err) => alert(err));
  }, []);

  return (
    <CineQuestCarousel title="Top Rated TV Shows" list={tvShowsList} />
  );
}

function RecentlyReleasedMovies() {

  const [recentlyReleasedMoviesList, setRecentlyReleasedgMoviesList] = useState([]);

  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=129348eec339866757f2e116253e264c';

  useEffect(() => {
    fetch(url).then(res => res.json()).then((res) => {
      // console.log(res);
      setRecentlyReleasedgMoviesList(res.results);

    }).catch((err) => alert(err));
  }, []);

  return (
    <CineQuestCarousel title="Recently Released Movies" list={recentlyReleasedMoviesList}  />
    // <CineQuestCarousel title="Recently Released Movies" list={recentlyReleasedMoviesList} redirectionLink="/Movies" />
  );
}

function CineQuestCarousel(props) {

  function handleClick() {
    console.log("handle click - redirect to another page");
  }

  let elements = [];
  for (let i = 1; i <= 18; i += 6) {
    let element = <Carousel.Item>
      <div className="carouselItemsContainer">
        {
          props.list.slice(i, i + 6).map((j) => {
            return <CarouselItem item={j} />
          })
        }
      </div>
    </Carousel.Item>;
    elements.push(element);
  }

  return (
    <>
      <h3 className="carouselHeader" onClick={handleClick}>
      {props.title}
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="seeMoreArrow" >
            <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
          </svg>
        {/* <Link href={props.redirectionLink} >
          {props.title}
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="seeMoreArrow" >
            <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
          </svg>
        </Link> */}
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
    console.log(props.item.id);
  }

  return (
    <div className='carouselItemParentDiv' onClick={handleClick}>
      {/* <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" /> */}
      <img src={"http://image.tmdb.org/t/p/w500" + (props.item.poster_path ? props.item.poster_path : props.item.backdrop_path)} />
      <div className='movieInformation'>
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