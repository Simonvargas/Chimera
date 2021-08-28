
import React from 'react';
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import { useSelector} from 'react-redux'

const NavBar = () => {
    const user = useSelector(state => state.session.user)
    console.log(user)
  return (
 <>
    {(user) ? <NavBar1 /> : <NavBar2 />}
 </>
  );
}

export default NavBar;