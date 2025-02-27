import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function HomeSlider2() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    async function getAllCateg(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const {data} = useQuery("CategorySlider", getAllCateg);
    
    return (
        <section className="p-5">
            <Slider {...settings}>
                {data?.data.data.map(function (item, idx) {
                    return (
                        <div key={idx}>
                            <img src={item.image} alt="" className=" w-full h-[100px] md:h-[200px]"/>
                            <h2 className="text-[10px] md:text-sm md:font-bold text-center text-green-600">{item.name}</h2>
                        </div>)
                })}
            </Slider>
        </section>
    );
}