import React from "react";
import "../styles/carRecommend.css";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { carRecommendations } from "../../constants";
import * as Api from "@/api";

const CarRecommend = () => {
  const tab = [
    {
      name: "轿车",
      key: "car",
    },
    {
      name: "新能源",
      key: "newEnergy",
    },
    {
      name: "SUV",
      key: "suv",
    },
  ];
  const [activeTab, setActiveTab] = React.useState("car");

  const [showDropdown, setShowDropdown] = React.useState(true);

  // 处理鼠标移入事件
  const handleMouseEnter = async (key: string) => {
    console.log("handleMouseEnter", key);
    setActiveTab(key);
    // Api.getListApi({
    //   category: "Sedan",
    //   pageNo: 1,
    //   pageSize: 10,
    // }).then((res) => {
    //   console.log(res);
    // });
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
  };

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="flex flex-row justify-center items-center w-full">
        {tab.map((item) => (
          <div
            key={item.key}
            className={`group h-20 w-1/3 mx-6 -skew-x-12 flex justify- center items-center cursor-pointer transition-all duration-300 ease-in-out ${
              activeTab === item.key ? `bg-blue-500 active` : "bg-white"
            }`}
            onMouseEnter={() => handleMouseEnter(item.key)}
          >
            <span className="text-4xl mx-auto text-black group-hover:text-white">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      {<CarList tab={activeTab}></CarList>}
    </div>
  );
};

const CarList = (tab: any) => {
  console.log(tab);
  return (
    <div className="flex flex-row flex-wrap justify-start items-center my-6 mx-4">
      {carRecommendations.map((item) => (
        <Card key={item.carId} className="w-1/5 p-2 rounded-none">
          <CardContent className="p-2">
            <Image
              className="m-auto"
              src={item.carImageList[0]}
              width={240}
              height={150}
              objectFit="cover"
              alt=""
            />
          </CardContent>
          <CardHeader className="p-2">
            {/* <CardTitle>{item.subject}</CardTitle> */}
            <CardDescription className="text-sm text-center truncate px-4">
              {item.subject}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">view more</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CarRecommend;
