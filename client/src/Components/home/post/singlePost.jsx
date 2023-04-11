import { Box, Typography , styled} from "@mui/material";
import { addElipsis } from "../../../utils/common-utils.js";


const Container = styled(Box)`
    border: 5px solid transparent;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    border:5px solid transparent;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
    backdrop-filter: blur(50px); 
    border-radius:10px;
    transition: all 0.3s ease;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
    &:hover {
        transform:scale(1.04);
        box-shadow: 10px 10px 10px  rgb(249, 19, 250,0.3) ;
        border:5px solid #f913fa;
        background-image:linear-gradient(to bottom right,rgba(249,19, 250,0.7),rgba(255,255,255,0.0));
      }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const SinglePost = ({ post }) => {

    const url = post.picture ? post.picture:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

  return (
    <Container>
      <Image src={url} alt="post image" />
      <Text> {post.categories} </Text>
      <Heading> {addElipsis(post.title,20)} </Heading>
      <Text> {post.username} </Text>
      <Details> {addElipsis(post.description,100)} </Details>
    </Container>
  );
};
export default SinglePost;
