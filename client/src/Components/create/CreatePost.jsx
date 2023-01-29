import {Box,styled,FormControl,InputBase,Button, Input,TextareaAutosize} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../contex/DataProvider";
import { API } from "../../service/api.js";

const Container = styled(Box)`
margin:50px 100px;
`;

const Image = styled('img')({
    height:'50vh',
    width:'100%',
   objectFit:'cover'
});

const StyledFormControl = styled(FormControl)`
  margin-top:10x;
  display:flex;
  flex-direction:row;
`;

const InputTextField = styled(InputBase)`
  flex:1;
  margin:0px 30px;
  font-size:25px;
`;

const TextArea = styled(TextareaAutosize)`
  width:100%;
  margin-top:50px;
  font-size:18px;
  border:none;
  &:focus-visible{
     outline:none;
  } 
`;

const initialPost = {
   title:'',
   description:'',
   picture:'',
   username:'',
   categories:'',
   createdDate:new Date()
}


const CreatePost = ()=>{
    const location = useLocation();
    const [post,setPost] = useState(initialPost);
    const url = post.picture?post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
   
    const [file,setFile] = useState('');
    const {account}  = useContext(DataContext);
    
   

    useEffect(() => {
      
        const getImage = async ()=>{
         
            if(file)
            {
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);
                const response = await API.uploadFile(data);
                post.picture = response.data; 
            }   
        }
       getImage(); 
       post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file]);
    
     
    const handleChange = (event)=>{
        setPost({...post,[event.target.name]:event.target.value})
    };
   
     
   
    return (
        <Container> 
              <Image src={url} alt='banner'/>
              <StyledFormControl>
                     <label htmlFor="fileInput"> 
                        <AddPhotoAlternateIcon fontSize="large" color="action"/>
                     </label>
                     <input type='file'  
                       id = 'fileInput'
                        style={{display:'none'}}
                        onChange ={(event)=>{setFile(event.target.files[0])}}
                     />
                     <InputTextField placeholder="Title" name='title'  onChange={ (event)=>{handleChange(event) } } />
                     <Button variant="contained">Publish</Button>
              </StyledFormControl>

             <TextArea
             minRows={5}
             placeholder='Tell Your Story!'
             name='description'
             onChange={(event)=>{handleChange(event)}}
             />
        </Container>
    )
}

export default CreatePost;