import { lazy, Suspense } from "react";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Category from "../components/Home/Category";
import Menu from "../components/Home/Menu";
import Banner from "../components/Home/Banner";
import Statistic from "../components/Home/Statistic";
const Blog = lazy(() => import("../components/Home/Blog"));
import Testimonial from "../components/Home/Testimonial";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Category />
      <Menu />
      <Banner />
      <Statistic />
      <Suspense>
        <Blog />
      </Suspense>
      <Testimonial />
    </>
  );
};

export default Home;
