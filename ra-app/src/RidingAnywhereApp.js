import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import HomePage from './RidingAnywhere-client/page/HomePage';

const RidingAnywhereApp = () => {
    return (
        <>
        <Container>
            <Routes>
                <Route path='/RA/Home' Component={HomePage}></Route>
            </Routes>
        </Container>
            
        </>
    );
};

export default RidingAnywhereApp;