import React from 'react';
import HomePage from './HomePage'
import SplashPage from './SplashPage'
import { useSelector} from 'react-redux'
import NavBar from '../Navigation/NavBar';

const Home = () => {
    const user = useSelector(state => state.session.user)

  return (
      <>
      <NavBar />
       {(user) ? <HomePage /> : <SplashPage />}
       </>
  )
};

export default Home;
