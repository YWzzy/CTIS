/*
 * @Author: yinhan 1738348915@qq.com
 * @Date: 2024-03-18 10:42:35
 * @LastEditors: yinhan 1738348915@qq.com
 * @LastEditTime: 2024-03-18 13:24:20
 * @FilePath: \ct-is\src\app\home\home.tsx
 * @Description:
 */
"use client";

import NavBar from "./NavBar";
import { Drop, Carousel, CarRecommend } from "@/components";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const [withOption, setWithOption] = useState(false);
  const router = useRouter();
  const [input, setInput] = useState("");

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          type: "spring",
          bounce: 500,
          stiffness: 100,
        }}
        className="flex flex-row items-center justify-between"
      >
        <Image src={"/logo.png"} width={60} height={60} alt="Logo" />
        <NavBar></NavBar>
        <Drop></Drop>
      </motion.div>

      <Image
        src="https://suncars-1251117131.cos.ap-shanghai.myqcloud.com/internal-site/main_pic7.png"
        width={100}
        height={678}
        alt="Sale Data"
      />

      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 500,
          stiffness: 100,
        }}
      >
        <Carousel />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 500,
          stiffness: 100,
        }}
      >
        <CarRecommend />
      </motion.div>
    </div>
  );
}
