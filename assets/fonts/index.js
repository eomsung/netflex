import localFont from "next/font/local";
import { Noto_Sans_KR } from "next/font/google";

export const kku = localFont({
  src: "/BMKkubulim.otf",
});

export const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const oreaorea = localFont({
  src: "BMEuljirooraeoraeOTF.otf",
});
