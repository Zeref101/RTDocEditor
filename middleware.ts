import { NextResponse } from "next/server";

export default function middleware(req: any) {
  let verify = req.cookies.get("pookie");
  let url = req.url;

  // If the cookie doesn't exist and the current page is "/", "/document", or "/dashboard", redirect to "/signUp"
  if (
    !verify &&
    (url === "http://localhost:3000/" ||
      url === "http://localhost:3000/document" ||
      url === "http://localhost:3000/dashboard")
  ) {
    return NextResponse.redirect("http://localhost:3000/signUp");
  }

  // If the cookie doesn't exist and the current page starts with "/document/", redirect to "/signUp"
  if (!verify && url.startsWith("http://localhost:3000/document/")) {
    return NextResponse.redirect("http://localhost:3000/signUp");
  }

  // If the cookie exists and the current page is either "/signIn" or "/signUp", redirect to the homepage
  if (
    verify &&
    (url === "http://localhost:3000/signIn" ||
      url === "http://localhost:3000/signUp")
  ) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  // If none of the above conditions are met, don't do any redirect
  return NextResponse.next();
}
