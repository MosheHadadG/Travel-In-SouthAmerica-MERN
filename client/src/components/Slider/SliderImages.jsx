import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderImages.css"
import "./SliderImagesResponsive.css"


const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 3000,
};

function SliderImages({ images }) {

  const renderImages = () => {
    const renderedImage = images.map((image, idx) => {
      return <div className="slider-item" key={idx}><img src={image} alt={`${idx} img`} /></div>
    });
    return renderedImage;
  }

  return (
    <Slider {...settings}>
      {renderImages()}
    </Slider>

  );

}

export default SliderImages;