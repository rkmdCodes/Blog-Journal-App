import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import SinglePost from "./singlePost.jsx";
import { useSearchParams , Link} from "react-router-dom";
import { API } from "../../../service/api.js";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  console.log(category);
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" });
      if (response.isSuccess) {
        console.log(response);
        setPosts(response.data);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Grid item lg={3} sm={4} xs={12}>
            <Link to={`details/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                 <SinglePost post={post} />
            </Link>
            </Grid>
          );
        })
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          No data available to show
        </Box>
      )}
    </>
  );
};

export default Post;
