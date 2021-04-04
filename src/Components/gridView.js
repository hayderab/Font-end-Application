import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './cardview';

class BlogGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
}
//  static contextType = UserContext;

// componentDidMount() {
//   // console.log('Received values of form: ', values);
//   // const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
//   // console.log(`logging in email: ${email}`)

//   fetch('http://localhost:5000/api/dogs/',{
//     // credentials: 'include',
//     method: 'GET',
//     body:JSON.stringify(data)
//     // headers: {
//     //   'Content-Type': 'application/json',
//     // }
//   })
//   // .then(response => response.status())
//   .then(response => response.json())
//   .then(data => {
//     this.setState({ posts: data })
//       // this.context.login(data);
//   })
//   .catch(error => {
//       // TODO: show nicely formatted error message
//       console.log("Error fetching dogs");
//   });
// };

  componentDidMount() {
    fetch('http://localhost:5000/api/dogs')
    // .then(response => response.status())
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({ posts: data })
    })
    .catch(err => console.log("Error fetching articles"));

  }
  render() {
    // return <h1>Data Loading </h1>
    // console.log(this.state.data.length); 
    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    // the next line does the Array.map() operation on the posts
    // to create an array of React elements to be rendered
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post._id}>
          <Col span={2}>
            <PostCard {...post} />  
          </Col>
        </div>
      )
    });
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default BlogGrid;
