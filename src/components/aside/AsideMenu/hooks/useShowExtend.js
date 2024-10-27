import { useEffect } from "react";
import useCurrentPath from "../../../../hooks/useCurrentPath";
import useShowExtendStore from "../../../../store/useShowExtendStore";
import { useLocation } from "react-router-dom";

function useShowExtend() {
  const currentPath = useCurrentPath();
  const location = useLocation();
  const showExtend = useShowExtendStore((state) => state.showExtend);
  const setShowExtend = useShowExtendStore((state) => state.setShowExtend);

  useEffect(() => {
    if (
      currentPath === 'file' || 
      currentPath === 'writing' 
    ) {
      setShowExtend(true);
    } else {
      setShowExtend(false);
    }
  }, [currentPath, location])

  return showExtend;
}

export default useShowExtend;