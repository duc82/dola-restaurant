import Container from "../Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import statistics from "@/data/statistics.json";
import CounterItem from "./CounterItem";

const Statistic = () => {
  return (
    <section className="py-5 pb-[60px]">
      <Container className="px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statistics.map((statistic) => (
            <div
              key={statistic.title}
              className="px-4 mb-5 lg:mb-0 odd:border-r odd:border-r-gray-500 lg:even:border-r lg:even:border-r-gray-500 last:border-none flex justify-center"
            >
              <div className="lg:flex items-center">
                <LazyLoadImage
                  width={64}
                  height={64}
                  src={statistic.image}
                  alt={statistic.title}
                  className="mx-auto"
                />
                <div className="text-center ml-5 lg:text-left">
                  <CounterItem end={statistic.quantity} />
                  <span className="text-sm capitalize font-extralight tracking-widest md:text-lg">
                    {statistic.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistic;
