import { useState } from 'react';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      id="Main"
      className="
      border-r-1 
      flex  
      h-full  
      w-full transform 
      flex-col 
      items-start

      p-4

      justify-between
      
      border-[1px] 
       border-white  
       border-opacity-10 
       bg-[#031016] 
       text-white/70
        transition
       duration-500 ease-in-out sm:w-64
       xl:translate-x-0"

    >
      <div>New Chat</div>

      <div> Account Button</div>
    </div>
  );
};

export default Sidebar;
