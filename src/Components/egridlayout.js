import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PostCard from './cardview';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {  
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={20}>
        <Grid container justify="center" spacing={spacing}>
          {[1,2,3,4,5,6,7,8,10].map((value) => (
            <Grid key={10} item>
              {/* <Paper className={classes.paper} /> */}
             <PostCard/>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  );
}
