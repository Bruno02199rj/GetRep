import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/api';
import "./Row.css";
import movieTrailer from 'movie-trailer';
import ReactPlayer from "react-player";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const baseUrl = "https://image.tmdb.org/t/p/original/"


const Row = ({categoria,path, isLarge}) =>{
//guardar filmes no estado
//metodo para pegar as informações que temos do filme
//atualizar apos renderizar  com useEfect
const [movies, setMovies] = useState([]);
const [trailerUrl, setTrailerUrl] = useState("");
const [scrollX, setScrollX] = useState(-400)

const handleLeftArrow = () =>{
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0) {
        x = 0;
    }
    setScrollX(x);
}

const handleRightArrow = () =>{
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = movies.results * 150;

    if((window.innerWidth - listWidth) > x){
        x = (window.innerWidth - listWidth) - 80;
    }
    setScrollX(x);
}

const handleOnClick = (item) => {
 
    if (trailerUrl) {
        setTrailerUrl("")
    } else {
        movieTrailer(item.name || item.title || item.original_name || item.id || "")
        .then((url)=>{
            setTrailerUrl(url)
        })
       
    }
  };

 

const getMovie = async (path) =>{
    try{
        const res = await getMovies(path);
        console.log(res)
        setMovies(res?.results); 
        
    }catch(error){
        console.log(error)
    }

}

useEffect(() => {
    getMovie(path)
}, []);



return(
    <>
    <div className='row-container'>
        <h2>{categoria}</h2>
        <div className='movieRow--left' onClick={handleLeftArrow}>
            <MdNavigateBefore style={{fontSize : 50}} />
        </div>
        <div className='movieRow--right'  onClick={handleRightArrow}>
            <MdNavigateNext style={{fontSize : 50}} />
        </div>
           <div className='filmes' style={{
            marginLeft: scrollX,
           }}> 
           {movies?.map((item)=>{
                return(
                    <>
                    <img 
                    key={item.id}
                    onClick={()=> handleOnClick(item)} 
                    className={`filme-card ${isLarge && "filme-card-largo"}`}
                    src={`${baseUrl}${
                        isLarge ? item.backdrop_path : item.poster_path}`} 
                    ></img>
                    </>
                );
            })}
           </div>
           {trailerUrl && <ReactPlayer className="react" url={trailerUrl} playing={true}  width='auto' height='700px' controls={true} />}
    </div>
   
    </>
);

}

export default Row;