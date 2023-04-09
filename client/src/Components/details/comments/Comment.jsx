import { useContext } from 'react';
import {Box,Typography,styled} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataContext } from '../../../contex/DataProvider';
import { API } from '../../../service/api';

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
    background: transparent;
  border-radius: 10px;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));

  &:hover {
    background: #f913fa;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
  }
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 800,
    font-size: 18px;
    margin-right: 20px;
    color:#1b0143
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: black;

`;

const Delete = styled(DeleteIcon)`
    margin-left: auto;
`;

const Comment = ({comment,setToggle})=>{
    const {account} = useContext(DataContext);

const removeComment =async ()=>{

    let response = await API.removeComment(comment._id);
    if(response.isSuccess)
    {
       setToggle( toggle=>!toggle);
    }

}    


  return ( <Component>
      <Container>
         <Name fontWeight="800" >{comment.name}</Name>
         <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
         {comment.name === account.username && <Delete onClick={()=>removeComment()} />}
      </Container>
    
      <Box>
          <Typography>{comment.comments}</Typography>
      </Box>
   </Component>
  )
}

export default Comment;