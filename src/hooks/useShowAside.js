import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useShowAside() {
  const location = useLocation();
  const [showAside, setShowAside] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
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
  }, [location])

  return showAside;
}