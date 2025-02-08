import { Carousel } from "antd";
import "./Banner.css";

const Banner = () => {
  return (
    <Carousel autoplay dots={false} className="banner-carousel">
      {/* Slide 1 */}
      <div className="banner-slide slide1">
        <div className="banner-content">
          <h1>Fantasy Collection</h1>
          <p>
            Mi ipsum faucibus vitae aliquet nec. Sagittis vitae et leo duis nec
            ullamcorper sit amet.
          </p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="banner-slide slide2">
        <div className="banner-content">
          <h1>Explore New Worlds</h1>
          <p>Discover the best books from different genres and authors.</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
