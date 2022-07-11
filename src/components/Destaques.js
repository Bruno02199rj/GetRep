import React, { useState, useEffect } from 'react';


import "./Destaques.css";

import categorias, { getMovies } from '../services/api';



const Destaques = () => {
    // FAZER LOADING ""!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const [filme,setFilmes] = useState({});
    const [logo, setLogo] = useState({});
   
       
    let elurl = `https://api.themoviedb.org/3/movie/${filme.id}?api_key=226160706fe73dfd9049e232396120fa`
   
    let fristDate = new Date(filme.first_air_date);
    let popularidade = Math.ceil(filme.popularity)

    const fetchFilmeAleatorio = async () =>{
        try {
            const netflixDestaques = categorias.find(
                (categoria) => categoria.name === "netflixOriginals"
            ); 

                const res = await getMovies(netflixDestaques.path);
                const movies = res?.results;
               
                
                setInterval(() => {
                    const indexAleatorio = Math.floor(Math.random() * res.results.length);
                    setFilmes(movies[indexAleatorio])
                }, 8000);
                    
             
               
                  
        
        }catch (error) {
            console.log(error)
        }
    }

    const fetchLogo = async () =>{
        const elpath = elurl
        try{
            const res = await getMovies(elpath);
            const l = res?.results;
            console.log(l)


        }catch(error){
            console.log("   LOGO    ",error)
        }
    }

    useEffect(() => {
      
        fetchFilmeAleatorio()
        fetchLogo()
      
        
    }, []);


  
  

    return(
        <>
     
            <header className='destaque-container' style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${filme?.backdrop_path}")`,
                roundPosition: "center-center",

               
            }}>
            <div className="destaque-conteudo">
        

            

           <h1 className="destaque-titulo">
        
           {filme?.title || filme?.name || filme?.original_name}
            </h1> 
            <div className="button-container">
                <div className="destaque-button">assistir</div> 
                <div className="destaque-button">minha  lista</div> 
            </div>
            <div className='moreInfoContainer'>
            <p className='votes'>{filme.vote_average} pontos</p>
            <p className='date'>{fristDate.getFullYear()}</p>
            
            </div>
           
           <div className="descricao">
            <h1 className='over'>{filme.overview}</h1>
            </div> 
           
           </div> 
            </header>
        </>
    );

}
 
export default Destaques;