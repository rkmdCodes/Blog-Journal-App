import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { style } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../service/api.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../../contex/DataProvider.jsx";

const Container = styled(Box)`
  margin: 50px 100px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break:break-word;
`;

const Edit = styled(EditIcon)`
  margin:5px;
  padding:5px;
  border:1px solid #878787;
  border-radius:10px;
`;

const Delete = styled(DeleteIcon)`
  margin:5px;
  padding:5px;
  border:1px solid #878787;
  border-radius:10px;
`;
const Author = styled(Box)`
  color:#878787;
  margin:20px 0;
  display:flex;
`;

const Description = styled(Typography)`
  word-break:break-word;
`;

const DetailView = () => {
  const [post, setPost] = useState({});

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



  return (
    <Container>
      <Image src={url} alt="blogImage" />
      <Box style={{ float: "right" }}>

        {
          account.username === post.username ?
          <>
          <Edit color="primary"/>
          <Delete  color="error" />
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
    </Container>
  );
};

export default DetailView;
