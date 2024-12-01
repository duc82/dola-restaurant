import { useRef, useEffect } from "react";

import { Fancybox as NativeFancybox, OptionsType } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface FancyboxProps extends React.PropsWithChildren {
  delegate?: string;
  options?: OptionsType;
  className?: string;
}

function Fancybox(props: FancyboxProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return (
    <div className={props.className} ref={containerRef}>
      {props.children}
    </div>
  );
}

export default Fancybox;
