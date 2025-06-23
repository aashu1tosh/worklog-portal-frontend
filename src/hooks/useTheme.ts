import { ThemeContext } from "@/contexts/themeContext";
import { useContext } from "react";

const useTheme = (): {
  theme: string;
  toggleTheme: (theme: "light" | "dark") => void;
} => {
  return useContext<{
    theme: string;
    toggleTheme: (theme: "light" | "dark") => void;
  }>(ThemeContext);
};

export default useTheme;
