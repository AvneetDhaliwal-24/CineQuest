import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import noImage from '../styles/no_img.jpg';
// Dani: I added a component to your Movie component but otherwise I have not touched your code
import MediaDetails from '../../app/components/MediaDetails';
import Media from '../../app/components/Media';

const Movie = ({ title, img, id, media_type, release_date }) => (
  <div className='movie-item'>
    <h3 className='movie-title'>{title}</h3>
    <div className='image-wrapper'>
      <Image loader={() => img}
        unoptimized={true}
        src={img}
        width={170}
        height={150}
        alt={title} />
        
    </div>
   
      <MediaDetails key={id} id={id} title={title} name={name}></MediaDetails>
  
    
  
  </div>
);

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const moviesPerPage = 9;
  const totalMoviesFetched = 20; // Number of movies fetched per API call
  let totalPages = Math.ceil(movies.length / moviesPerPage); 
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
  const router = useRouter();
  const searchParams = useSearchParams();


  // Fetch movies from the API with filters and sorting applied
  const fetchMovies = async (page = 1) => {
    const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
    const yearQuery = year ? `&primary_release_year=${year}` : '';
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}.${sortOrder}${genreQuery}${yearQuery}`;
    //receive index param
    const urlIndex = 'https://api.themoviedb.org/3/movie/';
    const urlFilter = searchParams.get('filter');
    
    if (urlFilter) {
      url = urlIndex + urlFilter;
      console.log('Filter applied:', urlFilter);
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYyNzIzN2Q4ZTllODE2MDkxMDAwYzVlY2ZmMWI3MiIsIm5iZiI6MTcyMjM4NjcxNi4xMjk2MDEsInN1YiI6IjY2YTAxYjUzYzk0NmJkZjk5NDBhNmM1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fnuxrcve4S4BJ_WagUZDhu6DbbLJ9sC1RH2Lg8Dt5_U'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(prevMovies => {
        // Update movies with new data
        const updatedMovies = [...prevMovies];
        data.results.forEach((movie, index) => {
          const pageIndex = (page - 1) * totalMoviesFetched + index;
          updatedMovies[pageIndex] = movie;
        });
        return updatedMovies;
        
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch movies when component mounts or filters/sort options change
  useEffect(() => {
    fetchMovies(currentPage);
  }, [sortBy, sortOrder, selectedGenre, year]);

  // Get the current set of movies to display based on pagination
  const getCurrentMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;

    let currentMovies = movies.slice(startIndex, endIndex);

    // If we need to fetch new movies because we're at the end of the fetched array
    if (currentMovies.length < moviesPerPage && currentMovies.length > 0) {
      const nextPageToFetch = Math.ceil((startIndex + 1) / totalMoviesFetched) + 1;
      fetchMovies(nextPageToFetch);

      // Fill the currentMovies with elements from the next batch
      const needed = moviesPerPage - currentMovies.length;
      const additionalMovies = movies.slice(0, needed);
      currentMovies = [...currentMovies, ...additionalMovies];

      console.log("needed movie num", needed);
      console.log('additionalMovies', additionalMovies);
    }

    return currentMovies;
  };

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Fetch new movies if the page number exceeds the current fetched count
    if (pageNumber > totalPages) {
      const nextPageToFetch = Math.ceil((pageNumber - 1) * moviesPerPage / totalMoviesFetched) + 1;
      fetchMovies(nextPageToFetch);
    } 
  };

  // Create pagination items for navigation
  const createPaginationItems = () => {
    let items = [];

    items.push(
      <button key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        First
      </button>
    );

    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <button key={number} onClick={() => handlePageChange(number)} style={{ fontWeight: number === currentPage ? 'bold' : 'normal' }}>
          {number}
        </button>
      );
    }

    items.push(
      <button key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    );

    return items;
  };

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Handle sort type change and reset sort order to descending
  const handleSort = (sortType) => {
    if (sortBy === sortType) {
      toggleSortOrder();
    } else {
      setSortBy(sortType);
      setSortOrder("desc");
    }
  };

  // Reload page to choose new filters
  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
    <div className='container'>
      {/* Filter and Sort Options */}
      <ButtonGroup>
        <DropdownButton as={ButtonGroup} title="Genre" id="bg-nested-dropdown">
          {/* Genre filter options */}
          <Dropdown.Item onClick={() => { setSelectedGenre(''); setGenre(""); }}>None</Dropdown.Item>
          <Dropdown.Item eventKey="1" onClick={() => { setSelectedGenre('28'); setGenre("Action"); }}>Action</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => { setSelectedGenre('12'); setGenre("Adventure"); }}>Adventure</Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={() => { setSelectedGenre('35'); setGenre("Comedy"); }}>Comedy</Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={() => { setSelectedGenre('80'); setGenre("Crime"); }}>Crime</Dropdown.Item>
          <Dropdown.Item eventKey="5" onClick={() => { setSelectedGenre('18'); setGenre("Drama"); }}>Drama</Dropdown.Item>
          <Dropdown.Item eventKey="6" onClick={() => { setSelectedGenre('10749'); setGenre("Romance"); }}>Romance</Dropdown.Item>
          <Dropdown.Item eventKey="7" onClick={() => { setSelectedGenre('878'); setGenre("Science Fiction"); }}>Science Fiction</Dropdown.Item>
        </DropdownButton>

        {/* Year filter input */}
        <input
          type="text"
          inputMode="numeric"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        {/* Sort by Popularity button */}
        <Button onClick={() => handleSort("popularity")}>
          Popularity {sortOrder === "asc" ? "↑" : "↓"}
        </Button>

        {/* Sort by Title button */}
        <Button onClick={() => handleSort("title")}>
          Title {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
        
        {/* Reset filters button */}
        <Button onClick={() => refreshPage()}>
          Reset filters
        </Button>
        
      </ButtonGroup>

      {/* Display the selected genre */}
      <div>
        <h2>{genre}</h2>
      </div>

      {/* Display the current set of movies */}
      <div className='movie-list'>
        {getCurrentMovies().map((movie) => (
          <Movie key={movie.id} title={movie.title}
            img={movie.poster_path ? imageBaseURL + movie.poster_path : noImage} 
            media_type={movie.media_type} id={movie.id}/>          
            
        ))}
      </div>

      {/* Pagination controls */}
      <div className='pagination'>
        {createPaginationItems()}
      </div>
    </div>
    </>
  ); 
}
