
import Media from '../../../components/Media';
import MediaDetails from '../../../components/MediaDetails';


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYyNzIzN2Q4ZTllODE2MDkxMDAwYzVlY2ZmMWI3MiIsIm5iZiI6MTcyMjM4Njc3Mi41ODg4NCwic3ViIjoiNjZhMDFiNTNjOTQ2YmRmOTk0MGE2YzUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6r442_LKzCRCTfepAK3yk95-7EedvIiPGIj1JMYblng'
    }
};

export async function generateStaticParams(id, searchInput) {
  
    const url = `https://api.themoviedb.org/3/search/multi?&query=${searchInput}&language=en-US&include_adult=false`
  const res = await fetch(url, options)
  const data = await res.json();
    return data.results.map((media) => ({
       id: media.id.toString(),
       media_type: media.media_type.toString()
    }));
    
   
  }
  

async function getTV(id, media_type){
    const url = `https://api.themoviedb.org/3/${media_type}/${id}`
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    return data;
}





export default async function SelectedMedia({params}) {
   const mediaParams = await getTV(params.id, params.media_type);
    return (
        <>
        {
           <div>
           {mediaParams.name ? (
             <Media key={mediaParams.id} id={mediaParams.id} name={mediaParams.name} first_air_date={mediaParams.first_air_date} last_air_date={mediaParams.last_air_date} image={`https://image.tmdb.org/t/p/original/${mediaParams.poster_path}`} media_type={mediaParams.media_type} overview={mediaParams.overview}></Media>  
           ) : (
            <Media key={mediaParams.id} id={mediaParams.id} title={mediaParams.title} release_date={mediaParams.release_date} image={`https://image.tmdb.org/t/p/original/${mediaParams.poster_path}`} media_type={mediaParams.media_type} overview={mediaParams.overview}></Media> 
           )}
         </div>
}
        </>
    )
}