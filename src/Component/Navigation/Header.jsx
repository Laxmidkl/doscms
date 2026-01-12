
import Logo from "../../assets/logo.jpg";

const Header = () => {
  return (
<header className="sticky top-0 z-50 h-16 flex items-center px-12 bg-gray-400">
      <div className=" flex flex-row justify-between w-full ">
        <img src={Logo} alt="Image" className="w-12 h-12 rounded-full" />
        <div>Profile</div>
      </div>
    </header>
  );
};

export default Header;

