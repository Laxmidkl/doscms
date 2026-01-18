
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
      name: "Gallery",
      icon: <FaRegFileAlt />,
      link :"/gallery"
    },

      {
      name: "Courses",
      icon: <RiBloggerLine />,
      link :"/courses"
    },

  {
      name: "Events",
      icon: <FaRegFileAlt />,
      link :"/events"
    },


      {
      name: "Contact",
      icon: <RiBloggerLine />,
      link :"/contact"
    },
    {
      name: "Book Now",
      icon: <MdOutlineEventNote />,
      link :"/book"
    }
  ];
  const navigate = useNavigate()
  return (
    <aside className="w-56 h-full overflow-y-auto [scrollbar-width:0] [&::-webkit-scrollbar]:hidden scrollbar-hide border-gray-400 border-l p-2 font-semibold  flex flex-col bg-gray-400">
      {item.map((nav, index) => (
        <div
          key={index}
          onClick={() => navigate(nav.link)}
          className=" text-black rounded-lg p-3 mt-5 hover:bg-red-500 hover:text-gray-100 flex gap-2 text-lg cursor-pointer"
        >
          <span className=" mt-1.5 ml-4 ">{nav.icon}</span>
          {nav.name} 
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
