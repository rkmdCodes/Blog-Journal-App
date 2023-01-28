import {Button,Table, TableBody,TableCell,TableRow,TableHead, linkClasses ,styled} from "@mui/material";
import { Link } from "react-router-dom";
import { categories } from "../../constants/data.js";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
  return (
    <>
      <StyledButton varient="contained"> Create Blog </StyledButton>
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
