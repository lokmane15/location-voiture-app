

const MarqueSlider = ({ marque }) => {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
    {
        breakpoint: 1200,
        settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        },
    },
    {
        breakpoint: 992,
        settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        },
    },
    {
        breakpoint: 576,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        },
    },
    ],
};

return (

);
};

export default MarqueSlider;
