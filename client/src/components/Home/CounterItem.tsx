import CountUp from "react-countup";

interface CounterItemProps {
  end: number;
}

const CounterItem = ({ end }: CounterItemProps) => {
  return (
    <CountUp
      end={end}
      duration={3}
      delay={0}
      enableScrollSpy={true}
      scrollSpyOnce={true}
    >
      {({ countUpRef }) => (
        <div className="text-3xl md:text-5xl font-medium leading-[54px]">
          <span ref={countUpRef}></span>
          <span>+</span>
        </div>
      )}
    </CountUp>
  );
};

export default CounterItem;
