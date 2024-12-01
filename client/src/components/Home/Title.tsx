import cn from "@/utils/cn";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import dish from "@/assets/images/dish.webp";

interface TitleProps extends React.PropsWithChildren {
  url?: string;
  className?: string;
}

const Title = ({ url, className, children }: TitleProps) => {
  return (
    <div
      className={cn(
        "flex space-x-2.5 justify-center items-center mb-7 sm:space-x-5",
        className
      )}
    >
      <LazyLoadImage
        src={dish}
        width={45}
        height={43}
        alt="Title"
        effect="opacity"
        className="object-cover select-none"
      />
      <h1 className="text-center font-dancing_script font-medium text-3xl leading-[56px] md:text-[48px]">
        {url ? (
          <Link to={url} className="hover:text-yellow-primary">
            {children}
          </Link>
        ) : (
          children
        )}
      </h1>
      <LazyLoadImage
        src={dish}
        width={45}
        height={43}
        alt="Title"
        effect="opacity"
        className="object-cover select-none rotate-90"
      />
    </div>
  );
};

export default Title;
