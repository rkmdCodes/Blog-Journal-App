import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contex/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment.jsx";


const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;

const InitialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};

export const Comments = ({ post }) => {
  const [comment, setComment] = useState(InitialValues);
  const {account} = useContext(DataContext);
  const [comments,setComments] = useState([]);
  const [toggle,setToggle] = useState(false);

  useEffect(()=>{
    
    const getData = async ()=>{
      let response = await API.getAllComments(post._id);
       if(response.isSuccess)
       {
        setComments(response.data);
        console.log('feched comment');
       } 

       
    }
    getData();
  },[post,toggle]);

  const url = "https://static.thenounproject.com/png/12017-200.png";

  const handleChange = (event) => {
    setComment({ ...comment,
    name:account.username,
     postId:post._id,
    comments:event.target.value});
  };

  const addComment = async ()=>{
  
    let response = await API.newComment(comment);
    if(response.isSuccess)
    {
        setComment(InitialValues);
    }
  
    setToggle(toggle=>!toggle);

  }

  return (
    <Box>
      <Container>
        <Image src={url} alt="commenting user image!" />
        <StyledTextArea
          minRows={5}
          placeholder={"What s on your mind"}
          value={comment.comments}
          onChange={(event) => handleChange(event)}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: "40px" }}
          onClick = {(event)=>addComment(event)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {
          comments && comments.length > 0 && comments.map( (comment)=>{
           return <Comment comment = {comment} setToggle={setToggle} />
          })
        }
      </Box>
    </Box>
  );
};

export default Comments;
