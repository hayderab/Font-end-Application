import React, { Component} from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {MenuItems} from "./MenuItems"
const { Header, Content, Footer } = Layout;

    ReactDOM.render(
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Locations</Menu.Item>
                <Menu.Item key="3">Singup</Menu.Item>
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <h1>Test</h1>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>,
        document.getElementById('container'),
    );

    export default Navbar

    // render() {
    //     return (
            
    //         <nav className="NavbarItems">
    //             <h1 className="narbar-logo">React</h1>
    //             <div className="menu_icon"> 
    //             <ul>
    //             <li>

                    
    //             </li>

    //             </ul>
                
    //             </div>
    //         </nav>

    //         )
   
    //     }
    





