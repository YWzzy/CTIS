import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselList = () => {
  // 轮播图片数据
  const listData = [
    // "https://avatars.githubusercontent.com/u/48836340?v=4",
    "https://suncars-1251117131.cos.ap-shanghai.myqcloud.com/internal-site/main_pic7.png",
  ];
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {listData.map((item, index) => (
          <CarouselItem
            key={item + index}
            className="w-full h-96 overflow-hidden relative flex aspect-square items-center justify-center p-0"
          >
            {item ? (
              // 如果有图片则显示图片
              <Image
                className="w-full h-full"
                src={item}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            ) : (
              // 如果没有图片则显示占位图片
              <Image
                className="w-full h-h-full"
                src="/logo.png"
                layout="fill"
                objectFit="cover"
                alt="占位图片"
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselList;
