/*
 * @Author: yinhan 1738348915@qq.com
 * @Date: 2024-03-18 10:42:35
 * @LastEditors: yinhan 1738348915@qq.com
 * @LastEditTime: 2024-03-18 13:54:03
 * @FilePath: \ct-is\src\app\home\home.tsx
 * @Description:
 */
"use client";

import NavBar from "./NavBar";
import { Drop, CarouselList, CarRecommend } from "@/components";
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
        className="h-20 flex flex-row items-center justify-between"
      >
        <Image
          className="bg-blue-500"
          src={"/logo.png"}
          width={150}
          height={100}
          alt="Logo"
        />
        <NavBar></NavBar>
        <Drop></Drop>
      </motion.div>

      <motion.div
        className="pt-0"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 500,
          stiffness: 100,
        }}
      >
        <CarouselList />
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
