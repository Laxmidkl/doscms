import { FaRegFileAlt } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { MdOutlineEventNote } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const item = [
    {
      name: "Home",
      icon: <GoHome />,
      link :""
    },

    {
      name: "About",
      icon: <FaRegFileAlt />,
      link :"/about"
    },

    {
      name: "Blog",
      icon: <RiBloggerLine />,
      link :"/blog"
    },
    {
      name: "Events",
      icon: <MdOutlineEventNote />,
      link :"/event"
    },
    {
      name: "Banner",
      icon: <FaRegFileAlt />,
      link :"/banner"
    },
  ];
  const navigate = useNavigate()
  return (
    <aside className="w-72 border-gray-400 border-l p-2 font-semibold  flex flex-col bg-linear-to-b 
from-gray-400/40 via-red-400/40 to-red-300/60">
      {item.map((nav, index) => (
        <div
          key={index}
          onClick={() => navigate(nav.link)}
          className="text-black rounded-lg p-3 mt-5 hover:bg-red-500 hover:text-white flex gap-2 text-lg cursor-pointer"
        >
          <span className=" mt-1.5 ml-4 ">{nav.icon}</span>
          {nav.name} 
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
