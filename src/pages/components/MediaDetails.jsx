'use client'
import { useRouter } from 'next/navigation';

export default function MediaDetails({id, name, media_type}){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYyNzIzN2Q4ZTllODE2MDkxMDAwYzVlY2ZmMWI3MiIsIm5iZiI6MTcyMjM4Njc3Mi41ODg4NCwic3ViIjoiNjZhMDFiNTNjOTQ2YmRmOTk0MGE2YzUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6r442_LKzCRCTfepAK3yk95-7EedvIiPGIj1JMYblng'
        }
    };

    const router = useRouter();
    async function getTV(id, media_type){
        const url = `https://api.themoviedb.org/3/${media_type}/${id}`
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
        
        
    }
    function detailGo(){
        getTV(id, media_type)
        .then(data => {
             return (data.id, data.name || data.title); // fetched movies
          });
    //    console.log(id, media_type);
       router.push(`/movies/${id}/${media_type}`)
       
       
    }

    return (
        <>
        <button onClick={detailGo}>More Info</button></>
    )
}