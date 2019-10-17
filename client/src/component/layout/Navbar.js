import React,{Fragment,useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Navbar = () => {
    useEffect(() => {
        console.log('use')
        toggleName()
    });
    const [state, setstate] = useState('project-name')
    const [admin,setAdmin] = useState(false)
    const toggleName = (state)=>{
        console.log('excuted')
        if(window.location.pathname==='/'){
            console.log('it /')
            setstate('project-name')
            setAdmin(true)
            return state
        }else{
            console.log('its not /')
            setstate('cmsshopping-cart')
            setAdmin(false)
            return state
        }
        
        
        
    }
   
    const guestLink = ()=>{
         return(
<div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/add-page'>page</Link></li>
            </ul>
          </div>
         )
    }
    const adminLink =()=>{
         return(
<div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><Link to='/add-page'>add-page</Link></li>
            </ul>
          </div>
         )
    }
    return (
        <Fragment>
        <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            
            <Link to={window.location.pathname !=='/'?'/':''} class="navbar-brand">{state}</Link>
          </div>
          {admin?<Fragment>{adminLink()}</Fragment>:<Fragment>{guestLink()}</Fragment>}
        </div>
      </nav>
      </Fragment>
    );
};


Navbar.propTypes = {
    
};


export default Navbar;
