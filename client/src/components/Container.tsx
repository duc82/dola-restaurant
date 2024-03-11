import { Ref, forwardRef } from "react";
import { ChildrenProps } from "../types";
import { twMerge } from "tailwind-merge";

interface ContainerProps extends ChildrenProps {
  className?: string;
}

const Container = forwardRef(
  ({ children, className }: ContainerProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "w-full px-4 mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1300px] 3xl:max-w-[1366px]",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export default Container;
