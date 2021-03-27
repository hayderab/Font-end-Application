import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';

const { Meta } = Card;

const CardView = () => {
  
    return (
        <Card
          style={{ width: 300 }}
          shadow = {3}
          hoverable={true}
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
          <Meta
            title="Card title"
            description="This is the description"
          />
        </Card>
        );
  }


  export default CardView;



// ReactDOM.render(
//   <Card
//     style={{ width: 300 }}
//     cover={
//       <img
//         alt="example"
//         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//       />
//     }
//     actions={[
//       <SettingOutlined key="setting" />,
//       <EditOutlined key="edit" />,
//       <FavoriteIcon />

//     //   <IconButton aria-label="add to favorites">
//     //   <FavoriteIcon />
//     // </IconButton>

//     ]}
//   >
//     <Meta
//       title="Card title"
//       description="This is the description"
//     />
//   </Card>,

//   document.getElementById('container'),
// );