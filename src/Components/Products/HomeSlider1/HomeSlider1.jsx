import React from "react";
import Slider from "react-slick";

import sliderImgOne from "./../../../../src/assets/images/slider-image-1.jpeg"
import sliderImgTwo from "./../../../../src/assets/images/slider-image-2.jpeg"
import sliderImgThree from "./../../../../src/assets/images/slider-image-3.jpeg"
import blogImgOne from "./../../../../src/assets/images/blog-img-1.jpeg"
import blogImgTwo from "./../../../../src/assets/images/blog-img-2.jpeg"

export default function HomeSlider1() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <section className="pb-5 px-4">
            <div className="flex flex-wrap justify-center items-center">
                <div className="w-2/3 pt-[0.4rem]">
                    <Slider {...settings}>
                        <div>
                            <img src={sliderImgOne} alt="slider Img One" className="w-full h-[300px] md:h-[400px]"/>
                        </div>

                        <div>
                            <img src={sliderImgTwo} alt="slider Img Two" className="w-full h-[300px] md:h-[400px]"/>
                        </div>

                        <div>
                            <img src={sliderImgThree} alt="slider Img Three" className="w-full h-[300px] md:h-[400px]"/>
                        </div>
                    </Slider>
                </div>

                <div className="w-1/3 h-[300px] md:h-[400px]">
                    <div>
                        <img src={blogImgOne} alt="blog Img One" className="w-full block h-[150px] md:h-[200px]"/>
                    </div>

                    <div>
                        <img src={blogImgTwo} alt="blog Img Two" className="w-full block h-[150px] md:h-[200px]"/>
                    </div>
                </div>
            </div>
        </section>
    );
}