export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

import home from "../public/home.svg";
import saved from "../public/save.svg";
import add from "../public/add.svg";

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
  {
    imgURL: add,
    route: "/document/",
    label: "Create a new Doc",
  },
];
