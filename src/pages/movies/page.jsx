
"use client";
import Media from '../components/Media';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { useState, useEffect } from 'react';



// async function getMediaList() {
//     const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
//     const res = await fetch(url, options)
//     const data = await res.json();
//     return data.results;
// }

export default function Movies() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYyNzIzN2Q4ZTllODE2MDkxMDAwYzVlY2ZmMWI3MiIsIm5iZiI6MTcyMjM4Njc3Mi41ODg4NCwic3ViIjoiNjZhMDFiNTNjOTQ2YmRmOTk0MGE2YzUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6r442_LKzCRCTfepAK3yk95-7EedvIiPGIj1JMYblng'
        }
    };

    async function searchMedia(searchInput) {
        const url = `https://api.themoviedb.org/3/search/multi?&query=${searchInput}&language=en-US&include_adult=false`
        const res = await fetch(url, options);
        const data = await res.json();

        setSearchResult(data.results);
    }

     async function handleSubmit(e) {
        e.preventDefault();
        await searchMedia(searchInput);
        return searchResult;
        
    }

     function handleChange(e) {
        const input = e.target.value;
        e.preventDefault();
        setSearchInput(input);
    }

    return (
        <>

            <h1>bbbBBBBBaaaaAAAAA!!!!!!!!!!!!!</h1>

            <SearchBar value={searchInput} onChange={handleChange} onClick={handleSubmit}></SearchBar>


            {
                <ul>
                    {searchResult.map(result => result.media_type == "movie" ? (
                       
                        <Media key={result.id} id={result.id} title={result.title} release_date={result.release_date} image={`https://image.tmdb.org/t/p/original/${result.poster_path}`} media_type={result.media_type}></Media> ) 
                        :(
                        <Media key={result.id} id={result.id} name={result.name} release_date={result.release_date} image={`https://image.tmdb.org/t/p/original/${result.poster_path}`} media_type={result.media_type}></Media>
                    ))}
                </ul>
            }


        </>
    )
}
