import React from 'react'
import HastTagCards from '../TagInput/HastTagCards'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';import { Button } from 'react-scroll';
import { GitHub, OpenInFull } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';

  


const RecommendedUserCard = ({data}) => {
    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    // setExpanded(!expanded);
  };

  const openGithubLink = ()=>{
    const githublink = data.githublink;
    window.open(githublink, '_blank');
  }

  const openMail = ()=>{
    const mailurl = `mailto:${data.email}`;
    window.open(mailurl);
  }

  return (
    <>
     <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data.username[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.username}
        subheader={data.collegeName}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        {
          data.tags.map(ele=>{
            return <Typography variant="body2" color="text.secondary" className='bg-gray-200 max-w-fit py-1 px-2 rounded-md'>#{ele}</Typography>
          })
        }
          {/* #Java */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={openGithubLink} aria-label="view-details">
          <GitHub />
        </IconButton>
        <IconButton onClick={openMail} aria-label="view-details">
          <EmailIcon />
        </IconButton>
        
        {/* <Button>View Details</Button> */}

      </CardActions>

    </Card>
    </>
  )
}



export default RecommendedUserCard
