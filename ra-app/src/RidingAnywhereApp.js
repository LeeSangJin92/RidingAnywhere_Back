import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes} from 'react-router-dom';
import HomePage from './RidingAnywhere-client/page/HomePage';
import LoginPage from './RidingAnywhere-client/page/LoginPage';
import SignupPage from './RidingAnywhere-client/page/SignupPage';
import AddBike from './RidingAnywhere-client/page/AddBike';

const RidingAnywhereApp = () => {

    document.title = "Riding AnyWhere"
    return (
        <>
        <Container>
            <Routes>
                <Route path='/RA/Home' Component={HomePage}></Route>
                <Route path='/RA/Login' Component={LoginPage}></Route>
                <Route path='/RA/SignUp' Component={SignupPage}></Route>
                <Route path='/RA/AddBike' Component={AddBike}></Route>
            </Routes>
        </Container>
            
        </>
    );
};

export default RidingAnywhereApp;