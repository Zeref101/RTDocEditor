export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

import home from "../public/home.svg";
import saved from "../public/save.svg";

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: saved,
    route: "/favourites",
    label: "Saved",
  },
];
