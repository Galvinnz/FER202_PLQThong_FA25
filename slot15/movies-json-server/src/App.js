import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieManager from "./pages/MovieManager";

function App() {
  return (
    <div className="App">
      {/* Đây là trang chính của bài lab:
          - Hiển thị form thêm phim mới
          - Cho phép sửa phim qua modal
          - Xóa phim với confirm
          - Load dữ liệu từ json-server (http://localhost:3001)
          - State toàn cục quản lý bằng Context + useReducer
      */}
      <MovieManager />

      {/*
        Nếu cần test nhanh API trước khi làm Context,
        bạn có thể tạm thời dùng giao diện đơn giản MovieList:

        <MovieList />
      */}
    </div>
  );
}

export default App;
