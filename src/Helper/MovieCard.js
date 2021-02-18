import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
export const MovieCard = ({ nameTitle, releaseDate, photo, actors, imdb, plot, colorNom,confirm }) => {
  const movieTitile = nameTitle ? nameTitle : "No Titile"
  const dateOfRelease = releaseDate != undefined ? releaseDate : "No Data Available"
  const actorInTheMovie = actors != undefined ? actors : "No Data Available"
  const moviePlot = plot != undefined ? plot : "No Data Available"
  const ratingImdb = imdb != undefined ? imdb : "No Data Available"
  const moviePoster = photo != undefined ? photo : ""
  const nominationData = colorNom != undefined || "secondary" ? colorNom : "default"
  const confirmData = confirm=="1" ? 1 : 0
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [nomination, setNomination] = React.useState(nominationData)
  const generateNomination = (name) => {
      
    
    setNomination("secondary")
    let d = JSON.parse(localStorage.getItem('movieData'))
    const data = {
      "title": name,
      "image": moviePoster
    }
    if (d === null) {
      localStorage.setItem('movieData', JSON.stringify({
        "myNon": [{
          "title": name,
          "image": moviePoster
        }]
      }))
    }
    else {
      if (d.myNon.length < 5) {
        d.myNon.push(data)
        localStorage.setItem('movieData', JSON.stringify(d))
      }
      else{
        alert("Ops! Sorry You Crossed the limit of nomination!! Remove any one to nominate other")
        window.location.replace("#nomination")
      }
    }
  
  }

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}
const setBackToDeafult=(til)=>{
  let d = JSON.parse(localStorage.getItem('movieData'))
  let  fl = d.myNon.filter((w)=>w.title!=movieTitile)
  // console.log(fl);
  localStorage.removeItem('movieData')
  localStorage.setItem('movieData',JSON.stringify({
    "myNon":fl
  }))
  window.location.reload()




}


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {movieTitile.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={movieTitile}
        subheader={dateOfRelease}
      />
      <CardMedia
        className={classes.media}
        image={moviePoster}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Typography paragraph style={{ marginBottom: -1 }}>Actors :</Typography>
          {actorInTheMovie}
          <Typography paragraph style={{ marginTop: 2 }}>IMDB Rating : {ratingImdb}</Typography>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" color={nomination} onClick={() => {
          nomination == "secondary" ? setNomination("default") : generateNomination(movieTitile)
        }}>
          <FavoriteIcon />
          {nomination != "secondary" && "Nominate"}
        </IconButton>
        {nomination == "secondary" && (<a href="#nomination">{!confirmData&&"My Nominations"}</a>)}
        {nomination == "secondary" && (<a href="#nomination">{confirmData&&<a href="" onClick={(e)=>{
          e.preventDefault()
          setBackToDeafult(movieTitile)
        }} >Remove My Nominations</a>}</a>)}
      </CardActions>
    </Card>
  );
}
