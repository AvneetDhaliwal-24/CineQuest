import '../../src/styles/movieDetails.css';

export default function Media({ id, title, name, release_date, image, media_type, air_date, first_air_date, last_air_date, overview }) {
    return (
        <>
            <div className='mediaPage'>
                <div className='left'>
                    <img className='searchImg' src={image}></img>
                </div>
                <div className='right'>
                    {title ? (
                        <>
                            <h1 className='media-title'>{title}</h1>
                            <p className='dates'>Release Date: {release_date}</p>
                        </>
                    ) : (
                        <>
                            <h1 className='media-title'>{name}</h1>
                            <p className='dates' >First aired: {first_air_date}</p>
                            <p className='dates'>Last aired: {last_air_date}</p>
                        </>
                    )}
                    <p className='overview'>{overview}</p>
                </div>
            </div>
        </>
    )

}