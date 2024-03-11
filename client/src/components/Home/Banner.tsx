import Container from "../Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import banners from "@/data/banners.json";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="pt-[60px]">
      <Container className="px-0">
        <ul className="flex overflow-x-auto">
          {banners.map((banner) => (
            <li
              key={banner.id}
              className="relative px-4 flex-[0_0_75%] sm:flex-[0_0_40%] lg:flex-1 group"
            >
              <LazyLoadImage
                src={banner.image}
                alt={banner.alt}
                effect="opacity"
              />
              <div
                className={
                  "absolute inset-[30px] p-2.5 bg-[rgba(13,17,21,0.9)] text-white transition-all duration-500 opacity-0 scale-[0.6] hidden lg:flex items-center justify-center z-10 group-hover:scale-100 group-hover:opacity-100"
                }
              >
                <Link to="/" className="text-center">
                  <span className="text-yellow-primary text-lg tracking-widest capitalize mb-1.5 block">
                    Dola Restaurant
                  </span>
                  <span className="text-2xl">{banner.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Banner;
