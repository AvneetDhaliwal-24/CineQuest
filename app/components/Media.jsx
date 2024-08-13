import styles from '../../src/styles/movieDetails.css';
import MediaDetails from './MediaDetails';

export default function Media({id, title, name, release_date, image, media_type, air_date}){
    return (
        <>
        <div style={{border: '1px solid red', margin: '2rem', padding: '1.5rem'}}>
            <h2>{id}</h2>
            <h1>{title}</h1>
            <h1>{name}</h1>
            <p>{air_date}</p>
            <p>{media_type}</p>
            <h4>{release_date}</h4>
            <img className = 'searchImg'src={image}></img>
        </div>
        </>
    )

}