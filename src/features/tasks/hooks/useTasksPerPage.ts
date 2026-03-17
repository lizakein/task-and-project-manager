import { useEffect, useState } from "react";
import { useMobile } from "@hooks/useMobile";

export function useTasksPerPage(containerRef: React.RefObject<HTMLElement | null>) {
  const [tasksPerPage, setTasksPerPage] = useState(5);

  useEffect(() => {
    function calculate() {
      if (!containerRef.current) return;

      const isMobile = useMobile(848);

      if (isMobile) {
        setTasksPerPage(5);
        return;
      }

      const containerHeight = containerRef.current.getBoundingClientRect().height;

      const taskHeight = 80;
      const count = Math.floor(containerHeight / taskHeight);

      setTasksPerPage(Math.max(count, 1));
    }

    calculate();

    const resizeOnserver = new ResizeObserver(calculate);

    if (containerRef.current) {
      resizeOnserver.observe(containerRef.current);
    }

    window.addEventListener("resize", calculate);

    return () => {
      resizeOnserver.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, [containerRef]);

  return tasksPerPage;
}