import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Select} from 'antd';
import "../App.css"




const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});



const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

/**
 * Makes Requests to font end for adding dogs, 
 * the from data is send to the background along with file.
 */
class AddDogs extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    state = {
        fileSelected: null
    }

    SelectFile = event => {
        this.setState({
            fileSelected: event.target.files[0]
        });
    }

    
    onFinish = (values) => {
        const fd = new FormData();
        console.log('Received values of form: ', values);
        fd.append("name", values.name)
        fd.append("type", values.type)
        fd.append("location", values.location)
        fd.append("avilable", values.avilable)
        fd.append("imageUrl", this.state.fileSelected)
        console.log(fd)
        // fd.append("imageUrl", this.state.fileSelected, this.state.fileSelected.name);
        fetch('http://localhost:5000/api/dogs',{
            credentials: 'include',
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
        .then(data => {
                // TODO: display success message and/or redirect
                if(data.status=== 403){
                    alert("error adding data, try again.")
                }
                console.log(data);
                window.location.assign('/')
                alert("Dogs added")
            })
            .catch(error => {
                // TODO: show nicely formatted error message and clear form
                alert(`Error: error}`);
            });
    };
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add Dogs
                    </Typography>
                    <Form {...layout} className={classes.form} name="register" onFinish={this.onFinish} scrollToFirstError encType="multipart/form-data">
                        <Form.Item name="name" label="Name"  >
                            <Input />
                        </Form.Item>
                        <Form.Item name="type" label="Type"  >
                            <Input />
                        </Form.Item>
                        <Form.Item name="location" label="Select">
                        <Select>
                        <Select.Option value="Coventry">Coventry</Select.Option>
                        <Select.Option value="London">London</Select.Option>
                        <Select.Option value="Birmingham">Birmingham</Select.Option>
                        <Select.Option value="Luton">Luton</Select.Option>
                        <Select.Option value="Bradford">Bradford</Select.Option>
                        </Select>
                    </Form.Item>
                        <Form.Item name="avilable" label="Select">
                            <Select>
                                <Select.Option value="true">True</Select.Option>
                                <Select.Option value="false">False</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item >
                            <input
                            type="file" 
                            fileName="imgeUrl" 
                            onChange={this.SelectFile} 
                            className="form-control-file"
                             />
                            {/* <Button onClick={this.fileUpload}>test</Button> */}
                        </Form.Item>
                        <Form.Item {...tailLayout} >
                            <Button type="primary" fullWidth variant="contained" htmlType="submit" color="Black" className={classes.submit}>
                                Add Dog
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Container>
        );
    }
}
export default withStyles(useStyles)(AddDogs);