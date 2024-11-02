import { useSelector } from "react-redux";
import uz from "@/locales/uz.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import kr from "@/locales/uzKrill.json";

const translations = {
  uz,
  en,
  ru,
  kr,
};

export const useTranslation = () => {
  const currentLanguage = useSelector((state) => state.language.language);
  const translation = translations[currentLanguage] || translations["uz"];

  return translation;
};

