import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";

export default function HomePage() {
  return (
    <div className="container mt-3">
      <HomeCarousel />
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>

        <MovieCard />
      </div>
    </div>
  );
}
