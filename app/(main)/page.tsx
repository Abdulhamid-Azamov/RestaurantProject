import Boasting from "@/modules/Home/Boasting";
import BookingPlace from "@/modules/Home/BookingPlace";
import Hero from "@/modules/Home/Hero";
import News from "@/modules/Home/News";
import PopularDishes from "@/modules/Home/PopularDishes";
export default function Home() {
  return (
    <div className="">
      <Hero />
      <PopularDishes />
      <BookingPlace />
      <Boasting />
      <News />
    </div>
  );
}
