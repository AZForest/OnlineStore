import React from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import classes from './Layout.module.css';
import BottomBar from '../../components/BottomBar/BottomBar';


const Layout = (props) => {
    return (
        <div style={{position: "relative"}}>
            <Navbar />
            <main className={classes.Content}>
                {props.children}
            </main>
            <BottomBar />
        </div>
        )
}

export default Layout;