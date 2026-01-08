import { FaRegFileAlt } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { MdOutlineEventNote } from "react-icons/md";
import { RiBloggerLine } from "react-icons/ri";

const Sidebar = () => {
  const link = [
    {
      name: "Home",
      icon: <GoHome />,
    },

    {
      name: "About",
      icon: <FaRegFileAlt />,
    },

    {
      name: "Blog",
      icon: <RiBloggerLine />,
    },
    {
      name: "Events",
      icon: <MdOutlineEventNote />,
    },
  ];
  return (
    <aside className="w-72 bg-gray-300 border border-gray-400 p-2 font-semibold  flex flex-col">
      {link.map((links, index) => (
        <div
          key={index}
          className="text-black rounded-lg p-3 mt-5 hover:bg-red-500 hover:text-white flex gap-2 text-lg"
        >
          <span className=" mt-1.5 ml-4 ">
          {links.icon}
          </span>
          {links.name} 
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
