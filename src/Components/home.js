import React from 'react'; 
import PostCard from './cardview';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { PageHeader } from 'antd';

import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import DynamicGridLayout from "./egridlayout";
// import Bar from "./searchbar.js";

const { Meta } = Card;


// Stacture of the component.
const home =  () => {
  
  // {      fetch('http://localhost:5000/api/dogs/')
  //         .then(response => response.json())
  //         .then(data => console.log(data))
  //         .catch( err => "failed")
  // }
  return (
    <div className="App">
      <header className="App-header">
        {/* <Bar /> */}
        {/* {PostCard} */}
        <DynamicGridLayout />
      </header>
      {/* <React.Fragment>

      <CssBaseline /> */}

      {/* <Container maxWidth="sm" Shadow={3}> */}
        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
       

      {/* </Container> */}

    {/* </React.Fragment> */}

      {/* <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <FavoriteIcon />

        //   <IconButton aria-label="add to favorites">
        //   <FavoriteIcon />
        // </IconButton>

        ]}
      >
        {/* <Meta
          title="Card title"
          description="This is the description"
        /> */}
      {/* </Card> } */}
    </div>

    //-----------------
      //   <Card
      //   style={{ width: 300 }}
      //   cover={
      //     <img
      //       alt="example"
      //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //     />
      //   }
      //   actions={[
      //     <SettingOutlined key="setting" />,
      //     <EditOutlined key="edit" />,
      //     <FavoriteIcon />

      //   //   <IconButton aria-label="add to favorites">
      //   //   <FavoriteIcon />
      //   // </IconButton>

      //   ]}
      // >
      //   {/* <Meta
      //     title="Card title"
      //     description="This is the description"
      //   /> */}
      // </Card>
    //--------------
  );
}

export default home;
// export it to use it anywere else.