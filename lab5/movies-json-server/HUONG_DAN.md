# 🎬 Movie Manager - Hướng dẫn sử dụng

## 📋 Tính năng đã hoàn thiện

### ✅ Authentication (Đăng nhập)
- Trang đăng nhập với validation
- Lưu thông tin user vào localStorage
- Protected routes - chỉ truy cập được khi đã đăng nhập
- Tự động redirect khi đăng nhập/đăng xuất

### ✅ Header Component
- Hiển thị thông tin user đang đăng nhập
- Dropdown menu với email, role
- Badge hiển thị role Admin
- Nút đăng xuất

### ✅ CRUD Operations (Đầy đủ)
- **Create**: Thêm phim mới với form validation
- **Read**: Hiển thị danh sách phim từ json-server
- **Update**: Sửa phim qua Modal
- **Delete**: Xóa phim với Modal xác nhận

### ✅ FilterBar Component
- **Tìm kiếm**: Theo tên phim (real-time)
- **Lọc theo thể loại**: Dropdown chọn genre
- **Lọc theo thời lượng**: Khoảng min-max (phút)
- **Sắp xếp**: 
  - Theo tên phim (A-Z, Z-A)
  - Theo năm sản xuất (tăng/giảm)
  - Theo thời lượng (tăng/giảm)
- Nút "Xóa bộ lọc" để reset

### ✅ Context Architecture
- **AuthContext**: Quản lý authentication
- **MovieContext**: Quản lý movies, filters, CRUD operations

---

## 🚀 Cách chạy ứng dụng

### 1️⃣ Chạy JSON Server (Terminal 1)
```bash
cd lab5/movies-json-server
npx json-server --watch db.json --port 3001
```

### 2️⃣ Chạy React App (Terminal 2)
```bash
cd lab5/movies-json-server
npm start
```

Ứng dụng sẽ mở tại: `http://localhost:3000`

---

## 🔐 Tài khoản đăng nhập

| Username | Password | Role | Tên đầy đủ |
|----------|----------|------|------------|
| `admin` | `admin123` | admin | Administrator |
| `user` | `user123` | user | Regular User |
| `demo` | `demo123` | user | Demo Account |

---

## 📖 Hướng dẫn sử dụng

### Bước 1: Đăng nhập
1. Mở ứng dụng tại `http://localhost:3000`
2. Sẽ tự động redirect đến trang `/login`
3. Nhập username và password (xem bảng trên)
4. Click "Đăng nhập"
5. Tự động chuyển đến trang quản lý phim

### Bước 2: Thêm phim mới
1. Điền vào form "Thêm Phim Mới"
2. Upload ảnh hoặc nhập URL
3. Điền đầy đủ: Tên, Mô tả, Thể loại, Thời lượng, Năm, Quốc gia
4. Click "➕ Thêm Phim"

### Bước 3: Tìm kiếm và lọc
1. **Tìm theo tên**: Gõ vào ô "Tìm kiếm theo tên"
2. **Lọc theo thể loại**: Chọn từ dropdown
3. **Lọc theo thời lượng**: Nhập min/max
4. **Sắp xếp**: Chọn tiêu chí và thứ tự

### Bước 4: Sửa phim
1. Click nút "Sửa" trên bảng
2. Modal sẽ mở với thông tin phim
3. Chỉnh sửa thông tin
4. Click "Lưu Thay Đổi"

### Bước 5: Xóa phim
1. Click nút "Xóa" trên bảng
2. Xác nhận trong Modal
3. Click "Xác nhận Xóa"

### Bước 6: Đăng xuất
1. Click vào tên user ở góc phải Header
2. Click "🚪 Đăng xuất"
3. Tự động redirect về trang login

---

## 🗂️ Cấu trúc thư mục

```
lab5/movies-json-server/
├── src/
│   ├── api/
│   │   └── movieAPI.js          # Axios config
│   ├── components/
│   │   ├── FilterBar.jsx        # Bộ lọc & tìm kiếm
│   │   ├── Header.jsx           # Header với user info
│   │   ├── MovieForm.jsx        # Form thêm/sửa phim
│   │   ├── MovieTable.jsx       # Bảng danh sách phim
│   │   └── ProtectedRoute.jsx   # Route bảo vệ
│   ├── contexts/
│   │   ├── AuthContext.jsx      # Context xác thực
│   │   └── MovieContext.jsx     # Context phim + filter
│   ├── pages/
│   │   ├── LoginPage.jsx        # Trang đăng nhập
│   │   └── MovieManager.jsx     # Trang quản lý phim
│   ├── reducers/
│   │   └── movieReducers.jsx    # Reducer cho movies
│   └── App.js                   # Router + Routes
├── db.json                      # Database (accounts, genres, movies)
└── package.json
```

---

## 🎯 Kiến trúc

### State Management
- **useReducer**: Quản lý state phức tạp (movies CRUD)
- **useState**: Quản lý filters, local state
- **Context API**: Chia sẻ state globally

### Routing
- **react-router-dom v6**
- Public routes: `/login`
- Protected routes: `/movies`
- Auto redirect: `/` → `/movies`

### API Integration
- **Axios**: HTTP client
- **json-server**: Mock REST API
- Base URL: `http://localhost:3001`

### Form & Validation
- **Bootstrap Forms**: UI components
- **Custom validation**: Tích hợp trong components
- **Real-time feedback**: isValid/isInvalid states

---

## 💡 Tips

1. **Dữ liệu mẫu**: Đã có 9 phim mẫu trong `db.json`
2. **Local Storage**: User info được lưu, tự động login lại
3. **Filter responsive**: Cập nhật real-time khi thay đổi
4. **Sort nhiều cấp**: Có thể kết hợp filter + sort

---

## 🐛 Troubleshooting

**Lỗi: Cannot GET /movies**
- ✅ Kiểm tra json-server đã chạy chưa (port 3001)

**Lỗi: Network Error**
- ✅ Kiểm tra `movieAPI.js` baseURL đúng `http://localhost:3001`

**Không đăng nhập được**
- ✅ Kiểm tra db.json có accounts chưa
- ✅ Kiểm tra json-server endpoint `/accounts`

**Filter không hoạt động**
- ✅ Kiểm tra MovieContext đã wrap MovieManager chưa

---

## 📝 Credits

- **React**: UI Framework
- **Bootstrap**: CSS Framework  
- **React-Bootstrap**: React components
- **json-server**: Mock API
- **Axios**: HTTP client
- **React Router**: Routing library

---

🎉 **Chúc bạn sử dụng ứng dụng thành công!**

