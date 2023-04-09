import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contex/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment.jsx";


const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
  background: transparent;
  border-radius: 10px;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));

  &:hover {
    background: #f913fa;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
  }
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledButton = styled(Button)`
text-transform: none;
  background: transparent;
  height: 48px;
  border-radius: 7px;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(255,255,255,0.2));
  transition: all 0.7s ease;

  &:hover {
    background: #f913fa;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
`;

const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
  font-size:14px;
  }
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
        <StyledButton
         variant = "contained"
          onClick = {(event)=>addComment(event)}
        >
          Post
        </StyledButton>
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
