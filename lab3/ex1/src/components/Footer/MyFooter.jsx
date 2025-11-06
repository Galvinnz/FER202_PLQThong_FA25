import  Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({author, email, linkGithub}) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email} </p>
      <p>&copy; {new Date().getFullYear()} Phạm Lê Quốc Thông. All rights reserved </p>
      <Button variant="link" href="https://github.com/Galvinnz/FER202_PLQThong_FA25.git" >My Link Github: {linkGithub}</Button>
    </footer>
  )
}
export default MyFooter;