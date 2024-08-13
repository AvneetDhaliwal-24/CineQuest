import styles from '../../src/styles/movieDetails.css';
import MediaDetails from './MediaDetails';

export default function Media({id, title, name, release_date, image, media_type, air_date, first_air_date, last_air_date, overview}){
    return (
        <>
        <div style={{margin: '2rem', padding: '1.5rem'}}>
            {/* <h2>{id}</h2> */}
            <h1>{title}</h1>
            <h1>{name}</h1>
            <p>First aired: {first_air_date}</p>
            <p>Last aired: {last_air_date}</p>
            <h4>Release Date: {release_date}</h4>
            <img className = 'searchImg'src={image}></img>
            <h4>{overview}</h4>
        </div>
        </>
    )

}