import { NavLink } from "react-router-dom";
import Logo from "/logo-white.png";

const Navbar = () => {
  return (
    <nav className="flex gap-6 wx py-5 bg-[#14181C]">
      <NavLink to="/">
        <img className="w-[120px] md:w-40" src={Logo} alt="" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
