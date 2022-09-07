import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import './Navigation.css';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='logedin-buttons'>
                <button className='logout' onClick={logout}>Logout</button>
                {/* <ProfileButton user={sessionUser} /> */}
            </div>
        );
    } else {
        sessionLinks = (
            <div className='loggedOut-buttons'>
                <NavLink className='login' to='/login'>Log in</NavLink>
                <NavLink className='signup' to='/signup'>Sign up</NavLink>
            </div>
        );
    }
    return (
        // <ul>
        //   <li>
        <div className='const-nav'>
            <NavLink className='home' exact to="/">BASEC<img className='home-tent' src="tent-text-icon.png" />MP</NavLink>
            <div className='icon-buttons'>
                <a href='https://github.com/Rymul'>
                    <AiFillGithub className='github navIcon'/>          
                </a>
                <a href='https://www.linkedin.com/in/ryanfmullen/'>
                    <AiFillLinkedin className='linkedin navIcon'/>
                </a>
                <a href='https://github.com/Rymul'>
                    <CgProfile className='aboutme navIcon' />
                </a>
            </div>
            {sessionLinks}
        </div>
        //   </li>
        // </ul>
      );
}

export default Navigation;