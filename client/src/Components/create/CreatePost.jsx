import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  Input,
  TextareaAutosize,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../contex/DataProvider";
import { API } from "../../service/api.js";



const Container = styled(Box)`
    margin: 50px 100px
`;


const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    height: '50vh'
}); 

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;

`;

const InputTextField = styled(InputBase)`
flex: 1;
margin: 0 30px;
font-size: 25px;
color: #ffffff ;
backdrop-filter: blur(50px); 
border-radius: 7px;
  box-shadow: 10px 10px 10px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(255,255,255,0.15));

  &:hover {
    background: transparent;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0.3));
  }
`;

const PublishButton = styled(Button)`
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
  }
`;

const Textarea = styled(TextareaAutosize)`
  width: 90%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  background: transparent;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.1));
  color: #ffffff ;
  &:hover {
    background: transparent;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0.3));
  }

  &:focus-visible {
    outline: none
  }
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createDate: new Date()
}
const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  
  console.log(file);
  
  const options = {
    headers: {
        'Content-Type': 'application/json',
    }
  };

  
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        
        const response = await API.uploadFile(data ,{
          headers: {
            "Content-Type": "multipart/form-data"
          }});
  
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);


  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log(post);
  };

   const savePost = async ()=>{
   
      let response = await API.createPost(post);

      if(response.isSuccess)
      {
        navigate('/');
      }
     
   }




  return (
    <Container>
      <Image src={url} alt="banner" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddPhotoAlternateIcon fontSize="large" color="secondary" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          name="title"
          placeholder="Title"
        />
        <PublishButton onClick={() => savePost()} variant="contained" color="primary">Publish</PublishButton>
      </StyledFormControl>

      <Textarea
        minRows={5}
        placeholder="Tell Your Story!"
        name="description"
        onChange={(event) => {
          handleChange(event);
        }}
      />
    </Container>
  );
};

export default CreatePost;
