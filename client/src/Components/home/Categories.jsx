import {Button,Table, TableBody,TableCell,TableRow,TableHead, linkClasses ,styled} from "@mui/material";
import { Link ,useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data.js";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.15));
    backdrop-filter: blur(50px); 
    border-radius:10px;

    &:hover{
        box-shadow:1px 1px 1px rgb(249,19,250,0.3);
        border:1px solid #f913fa;
    }
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
  transition: all 0.3s ease;

  &:hover {
    transform:scale(1.04);
    box-shadow: 6px 6px 5px rgb(249, 19, 250,0.3) ;
    background-image:linear-gradient(to bottom right,rgba(249,19, 250,0.7),rgba(255,255,255,0.0));
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
       
             <StyledButton variant="standard"> Create Blog </StyledButton>
         
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
