import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Twitter, LinkedIn } from "@mui/icons-material";
import HighlightAltTwoToneIcon from "@mui/icons-material/HighlightAltTwoTone";

const Banner = styled(Box)`
width: 100%;
background: url(https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg) center/55% repeat-x #000;
height: 50vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">Rajat Dwivedi</Typography>
        <Text variant="h5">
          I'm a Software Engineer Student based in India. I've built websites
          and desktop applications on MERN Stack.
          <br />
          If you are interested, you can visit my portfolio!
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link
              href="https://dwivedi-portfolio.netlify.app/"
              color="inherit"
              target="_blank"
            >
              <HighlightAltTwoToneIcon />
            </Link>
          </Box>
        </Text>
        <Text variant="h5">
          Need something built or simply want to have chat? Reach out to me on
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link
              href="https://twitter.com/Rajat24dwivedi"
              color="inherit"
              target="_blank"
            >
              <Twitter/>
            </Link>
          </Box>
          or connect with me on 
          <Link
            href="mailto:codeforinterview@gmail.com?Subject=This is a subject"
            target="_blank"
            color="inherit"
          >
            <LinkedIn />
          </Link>
          .
        </Text>
      </Wrapper>
    </Box>
  );
};

export default About;
