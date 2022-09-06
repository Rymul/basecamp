import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { logout } from '../../store/session';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import './Navigation.css';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='logedin-buttons'>
                <button onClick={logout}>Logout</button>
                {/* <ProfileButton user={sessionUser} /> */}
            </div>
        );
    } else {
        sessionLinks = (
            <div className='loggedout-buttons'>
                <NavLink className='login' to='/login'>Login</NavLink>
                <NavLink className='signup' to='/signup'>Sign Up</NavLink>
            </div>
        );
    }
    return (
        // <ul>
        //   <li>
        <div className='const-nav'>
            <NavLink className='home' exact to="/">BASECAMP</NavLink>
            <a href='https://github.com/Rymul'>
                <AiFillGithub className='github icon'/>          
            </a>
            <a href='https://www.linkedin.com/in/ryanfmullen/'>
                <AiFillLinkedin className='linkedin icon'/>
            </a>
            <a href='https://github.com/Rymul'>
                <CgProfile className='aboutme icon' />
            </a>
            {sessionLinks}
        </div>
        //   </li>
        // </ul>
      );
}

export default Navigation;