import React from 'react';
// import { Col, Row ,Space} from 'antd';
import PostCard from './cardview';
import { Pagination, Switch, Button, Space, Col, Row, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchBar from "./searchbar.js";
import { instanceOf } from 'prop-types';

const { Search } = Input;




const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    float: "right",
    background: "#f1f2f5"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});


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
      prevValue:"",
      avilable:true,
      filteredInfo: null,
      sortedInfo: null,
    };

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

    // this.componentDidMount(this.state.mylist)
    // console.log(page);
    // console.log(this.state.test);
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
    this.limit = 4;
    // console.log(this.state.cookie)
    console.log(this.value)
    console.log(page)
    console.log(this.state.avilable)
    const url = `http://localhost:5000/api/dogs/?page=${page}&limit=${this.limit}&avilable=${this.state.avilable}&location=${value}&type=${value}`
    //const url = `http://localhost:5000/api/dogs/?page=${page}&avilable=${this.state.avilable}&location=${value}&type=${value}`

    fetch(url)
      // .then(response => response.status())
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ posts: data })
      })
      .catch(err => console.log("Error fetching articles"));

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

              <Button onClick={this.checkIfAvilable}>Avilable</Button>
              <Button onClick={this.clearFilters}>Clear filters</Button>
              <Button onClick={this.clearAll}>Clear filters and sorters</Button>
              {/* <Switch checked={this.checkIfAvilable} onChange={this.checkIfAvilable} /> */}
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
          <Pagination current={this.state.current} onChange={this.onChange}  total={30} />
        </Col>
      </div>
    );
  }
}

export default GridView;
