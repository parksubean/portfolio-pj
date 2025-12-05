import React, {
   useEffect,
   useRef,
   forwardRef,
   useImperativeHandle,
} from "react";
import Lenis from "@studio-freight/lenis";

export type SmoothScrollHandle = {
   stop: () => void;
   start: () => void;
};

const SmoothScrollWrapper = forwardRef<
   SmoothScrollHandle,
   { children: React.ReactNode }
>(({ children }, ref) => {
   const lenisRef = useRef<Lenis | null>(null);

   useEffect(() => {
      lenisRef.current = new Lenis({
         duration: 1.2,
         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         smoothWheel: true,
         smoothTouch: true,
         gestureOrientation: "vertical",
         gestureTarget: document.getElementById("right-ctt") ?? undefined,
      } as any);

      const raf = (time: number) => {
         lenisRef.current?.raf(time);
         requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      return () => {
         lenisRef.current?.destroy();
      };
   }, []);

   useImperativeHandle(ref, () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
   }));

   return <>{children}</>;
});

export default SmoothScrollWrapper;
