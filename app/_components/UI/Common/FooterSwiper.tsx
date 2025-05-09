"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { websiteContent } from "@/app/WebsiteContent";
import "swiper/css";

const roles = websiteContent.roles;

interface Props {
    reverseDirection: boolean;
}

export default function FooterSwiper({ reverseDirection }: Props) {
    return (
        <Swiper
            className="!overflow-visible"
            wrapperClass="!ease-linear"
            spaceBetween={20}
            slidesPerView={"auto"}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: reverseDirection,
            }}
            loop={true}
            speed={24000}
            modules={[Autoplay]}
            scrollbar={{ draggable: true }}>
            {roles.length &&
                roles.map((role) => (
                    <SwiperSlide key={role} className="flex !w-fit uppercase">
                        <h1 className="bodyFont pb-0 font-bold text-nowrap select-none">{role} |</h1>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}
