"use client";
import React, { useState, useEffect } from 'react';
import Media from './Media';
import SearchResults from './SearchResults';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYyNzIzN2Q4ZTllODE2MDkxMDAwYzVlY2ZmMWI3MiIsIm5iZiI6MTcyMjM4Njc3Mi41ODg4NCwic3ViIjoiNjZhMDFiNTNjOTQ2YmRmOTk0MGE2YzUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6r442_LKzCRCTfepAK3yk95-7EedvIiPGIj1JMYblng'
    }
};


export default function SearchBar({value, onChange, onClick}) {

    
    return (
        <>

            <form style={{ border: '1px solid red', margin: '2rem', padding: '1.5rem' }}>
                <input type='text' value={value} onChange={onChange}></input>
                <button onClick={onClick}>Search</button>
            </form>

        </>

    )
}