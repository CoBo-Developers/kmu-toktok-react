import { useEffect, useState } from "react";
import useCurrentPath from "../../../../hooks/useCurrentPath";

export default function useShowAside() {
  const currentPath = useCurrentPath();
  const [showAside, setShowAside] = useState(false);

  useEffect(() => {
    if (
      currentPath == 'chatbot' ||
      currentPath == 'chatprof' ||
      currentPath == 'file' ||
      currentPath == 'writing'
    ) {
      setShowAside(true);
    } else {
      setShowAside(false);
    }
  }, [currentPath])

  return showAside;
}