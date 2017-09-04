//React
import React from 'react';
//External 
import {Link} from 'react-router-dom';
import westerwynhollow from 'images/westerwynhollow.svg';

class Home extends React.Component {
    constructor (props) {
        super();
    }
    
    render(){
        return(
          <div className="home-landing-page">
            <img className="home-logo" src={westerwynhollow} alt="Westerwyn Hollow Logo" />
            {/*<Link to={{pathname: process.env.PUBLIC_URL + '/eddie'}}>Eddie the Lizard</Link>*/}
          </div>
        )
    }
}

export default Home;
