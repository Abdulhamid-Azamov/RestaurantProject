"use client";

import { useEffect, useState } from "react";
import MealCard from "../../components/MealCard";
import MenuButton from "../../components/MenuButton";
import { NextIcon, PrevIcon } from "@/public/icons";
import Image from "next/image";
import { LeafBL, LeafRight } from "@/public/images";
import { GetPopular } from "@/app/lib/service";




const OBV_NUM = 4;

const PopularDishes = () => {
  const [popularMenus, setPopularMenus] = useState<Menu[]>([])
  const [startIndex, setStartIndex] = useState(0);

  const popMeals = popularMenus.slice(startIndex, startIndex + OBV_NUM);
  const canPrev = startIndex > 0;
  const canNext = startIndex + OBV_NUM < popularMenus.length;

  const prev = () => { if (canPrev) setStartIndex((i) => i - OBV_NUM); };
  const next = () => { if (canNext) setStartIndex((i) => i + OBV_NUM) };


  useEffect(() => {
    GetPopular().then(data => {
      setPopularMenus(data)
    })
  }, [])
  return (
    <div className="relative py-16 overflow-hidden">
      <Image src={LeafBL} alt="" width={252} height={252} className="absolute bottom-120 -right-20 z-99 rotate-70 pointer-events-none select-none" />
      <Image src={LeafRight} alt="" width={258} height={258} className="absolute  z-999 -left-25 bottom-30 pointer-events-none select-none" />
      <h2 className="text-center text-4xl font-black text-black mb-12">
        Популярные блюда
      </h2>
      <div className="relative flex items-center gap-4 containers">
        <button onClick={prev} disabled={!canPrev} className="shrink-0 w-15 h-15 flex text-[150px] items-center justify-center  backdrop-blur-sm  transition-all duration-200  active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100" >
          <PrevIcon />
        </button>
        <div className="flex-1 grid grid-cols-4 gap-6 pt-12">
          {popMeals.map((meal, index) => (
            <MealCard key={meal.id} meal={meal} featured={index === 1 || index === 2} />
          ))}
        </div>
        <button onClick={next} disabled={!canNext} className="shrink-0 w-15 h-15 flex text-[150px] items-center justify-center  backdrop-blur-sm  transition-all duration-200  active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100" >
          <NextIcon />
        </button>
      </div>
      <div className="containers flex justify-end mt-10">
        <MenuButton title="Посмотреть меню" href="/menu" />
      </div>
    </div>
  );
};

export default PopularDishes;
