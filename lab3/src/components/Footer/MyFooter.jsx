import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter() {
  return (
    <footer>
      <p>Author: ThongPLQ</p>
      <p>Created by: thongphamle.22.12@gmail.com</p>
      <p>&copy; {new Date().getFullYear()} ThongPLQ. All rights reserved</p>
      <Button
        variant="link"
        href="https://github.com/Galvinnz/FER202_PLQThong_FA25"
        target="_blank"
        rel="noreferrer"
      >
        My Link Github's project: Movies Management
      </Button>
    </footer>
  );
}
export default MyFooter;