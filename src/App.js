import React from 'react';
import { useState, useEffect } from 'react';
import Destaques from './components/Destaques.js';
import Row from './components/Row.js';
import categorias from './services/api.js';
import Navegacao from './components/Navegacao.js';
import ClipLoader from "react-spinners/ClipLoader";
import { MoonLoader } from 'react-spinners';

function App(){

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true)

    setTimeout(() => {
      setLoader(false)
    }, 5000)
  }, []);

  return(
   <>
    {
      loader?

      <MoonLoader loading={loader} className='load' color={"red"} cssOverride={
      {
        position: "absolute",
        top: "50%",
        marginTop: "-30px",       
         left: "47%"
    
      }
      }
      />
   :
    <>
      <Navegacao />
      <Destaques />
      {categorias.map((item,index)=>{
    return(
      <Row
      key={index}
      isLarge={item.isLarge}
      path={item.path}
      categoria={item.title}
      />
    );
   })}
    </>  
    }
   </>
  );
}

export default App;
