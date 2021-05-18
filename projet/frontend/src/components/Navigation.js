import React, { Component } from 'react';

import Header from './Header'
import HomeView from './HomeView'

class Navigation extends Component {
    render() {
        return (
            <>
                <Header />
                <HomeView />
            </>
        )
    }
}

export default Navigation;