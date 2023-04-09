import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { style } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useParams,Link, useNavigate} from "react-router-dom";
import { API } from "../../service/api.js";
import {Edit,Delete} from "@mui/icons-material";
import { DataContext } from "../../contex/DataProvider.jsx";

import Comments from "./comments/Comments.jsx";

const Container = styled(Box)`
    margin: '50px 100px';
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(255,255,255,0.4));
    backdrop-filter: blur(50px); 
    border-radius:10px;
    border: 5px solid transparent;
    border-radius:10px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    backdrop-filter: blur(50px); 
    border-radius:10px;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
    
    &:hover {
        background: #f913fa;
        box-shadow: 5px 5px 5px rgba(30, 30, 30, 0.3);
        background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
      }
`;

const DeleteIcon = styled(Delete)`
margin: 5px;
padding: 5px;
backdrop-filter: blur(50px); 
border-radius:10px;
background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));

&:hover {
    background: #f913fa;
    box-shadow: 5px 5px 5px rgba(30, 30, 30, 0.3);
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
  }
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)`
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
`;

const Description = styled(Typography)`
  word-break:break-word;
`;

const DetailView = () => {
  const [post, setPost] = useState({});
 const navigate = useNavigate();
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  
  const { id } = useParams();
  const {account} = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

   
  const deleteBlog = async()=>{
   
    const response =await API.deletePost(post._id);
    if(response.isSuccess)
    {
      console.log("yaha toh aa rha hai yr ");
       navigate('/');
    }

  }

  return (
    <Container>
      <Image src={url} alt="blogImage" />
      <Box style={{ float: "right" }}>

        {
          account.username === post.username ?
          <>
          <Link to={`/update/${post._id}`}>
            <EditIcon color="primary"/>
          </Link>
          <DeleteIcon onClick={()=>deleteBlog()} color="error" />
          </>
          :
          <>
          </>  
 
        }
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Typography>Author:<Box component="span" style={{fontWeight:600}} >{post.username}</Box></Typography>
        <Typography style={{marginLeft:'auto'}} >{new Date(post.createdDate).toDateString()}</Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
