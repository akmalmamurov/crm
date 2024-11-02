import { useSelector } from "react-redux";

const useCurrentColor = () => {
  const { sidenavType, theme } = useSelector((state) => state.theme);
  return theme[sidenavType];
};

export default useCurrentColor;
