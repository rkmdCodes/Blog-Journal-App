import {Button,Table, TableBody,TableCell,TableRow,TableHead, linkClasses ,styled} from "@mui/material";
import { Link ,useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data.js";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.15));
    backdrop-filter: blur(50px); 
    border-radius:10px;
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%; 
    text-decoration: none;
    background: transparent;
  height: 48px;
  border-radius: 7px;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(255,255,255,0.2));

  &:hover {
    background: #f913fa;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
  }


`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #FFFFFF;
`;

const Categories = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    console.log(category);


  return (
    <>
      <StyledLink  to={`/create?category=${category ||''}`} >
       
             <StyledButton variant="contained"> Create Blog </StyledButton>
         
      </StyledLink>
      <StyledTable>
      <TableHead>
          <TableRow>
              <TableCell>
                  <StyledLink  to={"/"}>
                     All Categories                  
                  </StyledLink>
              </TableCell>
          </TableRow>
      </TableHead>
      <TableBody>
          {
              categories.map(category => (
                  <TableRow key={category.id}>
                      <TableCell>
                          <StyledLink  to={`/?category=${category.type}`}>                          
                              {category.type}                                                      
                          </StyledLink>
                      </TableCell>
                  </TableRow>
              ))
          }
      </TableBody>
  </StyledTable>
    </>
  );
};

export default Categories;
