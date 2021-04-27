import React from 'react';
// import { Col, Row ,Space} from 'antd';
import PostCard from './cardview';
import { Pagination, Button, Space, Col, Row, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const { Search } = Input;






class GridView extends React.Component {

  // pageSatate = { page: 0 };



  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      current: 6,
      limit: 0,
      serchValue: "",
      prevPage:1,
      sort: 1,
      prevValue:"",
      avilable:"true",
      filteredInfo: null,
      sortedInfo: null,
    };

  }
  latest = () =>{
    this.setState({
      sort: -1
    });
    this.componentDidMount(this.state.prevValue, this.state.prevPage, this.state.sort);

  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  onSearch = value => {
    this.componentDidMount(value, this.state.prevPage)
    this.setState({
        prevValue:value,
    });

  };
  onChange = page => {
    this.componentDidMount(this.state.prevValue, page)

    this.setState({
      current: page,
      prevPage: page
    });
  };
  clearFilters = () => {
    this.setState({ avilable: "true" });
    this.componentDidMount();
  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  checkIfAvilable = () => {
    // console.log(this.state.avilable)

    this.componentDidMount(this.state.prevValue, this.state.prevPage, this.state.avilable);

    this.setState({
      avilable: "false"
    });
  };

  componentDidMount(value =``, page) {
    this.limit = 5;
    console.log("....", this.state.sort)
    const url = `http://localhost:5000/api/dogs/?page=${page}&limit=${this.limit}&avilable=${this.state.avilable}&location=${value}&type=${value}&sort=${this.state.sort}`
    fetch(url)
      // .then(response => response.status())
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ posts: data })
      })
      .catch(err => console.log("Error fetching dogs"));

  }
  render() {
    // console.log(this.state.data.length); 
    if (!this.state.posts.length) {
      return <LoadingOutlined />

    }
    // the next line does the Array.map() operation on the posts
    // to create an array of React elements to be rendered
    const cardList = this.state.posts
    .map(post => {
      return (
        <div style={{ padding: "10px" }} key={post._id}>
          <Col span={2}>
            <PostCard {...post} />
          </Col>
        </div>
      )
    });
    return (
      <div>
        <Col>
          <>
            <Space style={{ marginBottom: 16 }}>

              <Button onClick={this.checkIfAvilable}>Not Avilable</Button>
              <Button onClick={this.latest}>Latest</Button>
              <Button onClick={this.clearFilters}>Clear filters</Button>
              {/* <SearchBar/>   */}
              <div>
                <AppBar position="static">
                </AppBar>
                <Toolbar>
                  <Space direction="vertical" float="right">
                    <Search placeholder="input search text" allowClear enterButton="Search" size="large" onSearch={this.onSearch}
                    />
                  </Space>
                </Toolbar>
              </div>
            </Space>
          </>
        </Col>
        <Row type="flex" justify="space-around">
          {cardList}
        </Row>
        <Col>
          <Pagination current={this.state.current} onChange={this.onChange} total={30} />
        </Col>
      </div>
    );
  }
}

export default GridView;
