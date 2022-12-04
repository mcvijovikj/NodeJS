import React, { useEffect, useState } from 'react';
import { API_AGE_URL, API_URL } from './utils/constants';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from "react-router-dom";
import { Quotes } from './components/Quotes';
import { RandomQuote } from './components/RandomQuote';

function App() {

  const [quotes, setQuotes] = useState<any>([]);
  const [randomQuote, setRandomQuote] = useState<any>([])
  const [randomAge, setRandomAge] = useState<any>([]);
  const [ageApiData, setAgeApiData] = useState<any>();
  // let displayData: any = [];



  // const  enrichData = (json: any) => {
  //   for(let i = 0; i < json.length; i++){
  //     let author = json[i].a.split(' ');
  //     let authorName = author[0].toLowerCase();

  //console.log(authorName.toString());



  // const fetchAgeData = async () => {
  //   const data = await fetch("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="+ authorName +"&api_key=9a32f4fc4d9d7d4157ef376b08a7fa80&format=json")
  //   const result = await data.json();

  //   const element = {
  //     listeners: result.toptracks.track[0].listeners,
  //     ...json[i]
  //   }
  //let displayData = 
  //       displayData.push(element);
  //       console.log(quotes);
  // }
  //  fetchAgeData().catch(console.error)
  //   }

  // }


  // povik za site quotes
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   const data = await fetch(`${API_URL}/quotes`);
  //   //   const json = await data.json();

  //     // enrichData(json);
  //     // if (displayData.length > 0 ){
  //     //   setQuotes(displayData)
  //     //  }
  //   },
  //   // fetchData()
  //   // .catch(console.error);



  // // }, 
  // [])



  useEffect(() => {
    fetch(`${API_URL}/quotes`)

      .then(res => res.json())
      .then(json => {

        setQuotes(json)
      })

      .catch(err => alert(err))
  }, [])



  //povik do single quote
  const getRandomQuote = () => {

    fetch(`${API_URL}/random`)
      .then(res => res.json())
      .then(json => setRandomQuote(json))
      .catch(err => alert(err))

  }



  return (
    <div id='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/quotes' element={<Quotes listOfQuotes={quotes} getRandomQuote={getRandomQuote} />} />
          <Route path='/random-quote' element={<RandomQuote getRandomQuote={getRandomQuote} randomQuote={randomQuote} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
