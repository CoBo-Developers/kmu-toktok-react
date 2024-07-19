import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useCurrentPath() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setCurrentPath(path);
  }, [location])

  return currentPath;
}