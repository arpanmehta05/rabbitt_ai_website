import Navbar from "@/components/home/Navbar";

// The one navbar of the whole site is components/home/Navbar. Every page except the home page is
// dark, so it is used here with the dark theme. (The home page uses Navbar itself and marks its
// sections with data-nav-theme.)
export default function SiteNavigation() {
  return <Navbar theme="dark" />;
}
