import {Box,Typography,styled} from '@mui/material';

const Image = styled(Box)`
width: 100%;
background: url(https://i.pinimg.com/originals/c0/9b/92/c09b92df282811f76db635f9bb15eac2.jpg) center/100% repeat-x #000;
height: 50vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Heading = styled(Typography)`
  font-size:70px;
  backdrop-filter: blur(5px);
  color:#ffffff;
`;

const SubHeading = styled(Typography)`
  font-size:20px;
  color:#ffffff;
  backdrop-filter: blur(5px);
`;


const Banner = ()=>{
    
    return (
      <Image>
        <Heading>Blog And Journal</Heading>
        <SubHeading>Rajat Dwivedi</SubHeading>
      </Image>
    )
};

export default Banner;