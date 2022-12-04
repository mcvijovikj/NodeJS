import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_AGE_URL, API_URL } from '../utils/constants';


export type Props = {
    listOfQuotes: any;
    getRandomQuote: any;
   
}

export const Quotes: React.FC<Props> = (props: Props ) => {
   const {listOfQuotes, getRandomQuote} = props;

 const [authorsAge, setAuthorsAge] = useState<any>([]);


 const  getAgeForAuthor  = async (fullName: string) => {
    const firstName = fullName.split(' ')[0]
    

  fetch(`${API_AGE_URL}/?name=${firstName}` )
  // da go convert response-ot vo JSON (find solution)
  .then( res => res.json())
  .then(json => {
    const age = json.age
    const authorThatHasAge = {name: fullName, age};
    setAuthorsAge(authorsAge.push(authorThatHasAge));
  })


    

 }

    return (



<>
        <div id='quotes'>
            {listOfQuotes.length > 0 ? <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quote</th>
                        <th>Author</th>
                        <th>Age Emoji</th>
                    </tr>
                </thead>
                <tbody>
                    {listOfQuotes.map((quote: any, i: number)=> {
                        return(
                            <tr key={i}>
                                <td>{quote.c}</td>
                                <td>{quote.q}</td>
                                <td>{quote.a}</td>
                                <td>{authorsAge.find((author: any)=> quote.a === author.name) ? authorsAge.find((author: any)=> quote.a === author.name).age : (<button onClick={()=> getAgeForAuthor(quote.a)}>Check Age!</button>) }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> : <h2>Loading Quotes...</h2>}
        </div>

        <div>
            <Link to='/random-quote'>
            <button onClick={()=>getRandomQuote()}>Get an inspirational quote</button>
            </Link>
            
            
        </div>
        </>
    )}