import * as React from 'react';
import { Link } from 'react-router-dom';

export type Props = {
    getRandomQuote: any;
    randomQuote: any;
}

export const RandomQuote: React.FC<Props> = (props: Props) => {
    const { getRandomQuote, randomQuote } = props;

    return (
        <>
            <div id='randomQuote'>
          

                
                {randomQuote.length > 0 ? <table border={1}>
                    <thead>
                        <tr>
                            <th>Quote</th>
                            <th>Author</th>
                        </tr>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {randomQuote.map((quote: any, i: number) => {
                            return (
                                <tr key={i}>
                                    <td>{quote.q}</td>
                                    <td>{quote.a}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : <h2>Loading Quotes...</h2>}


            </div>
            <Link to='/quotes'>
                <button>Back to all quotes</button>
            </Link>
            <Link to='/random-quote'>
                <button onClick={() => getRandomQuote()}>Random Quote!</button>
            </Link>
        </>
    )
}