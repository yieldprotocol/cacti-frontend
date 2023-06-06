import { useState } from 'react';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const reset = () => {
    const q = window.location.search;
    const params = new URLSearchParams(q);
    params.delete('s');
    const paramString = params.toString();
    window.location.assign(paramString ? `/?${paramString}` : '/');
  };

  return (
    <div
      className="
      border-r-1 
      flex  
      h-full  
      w-full 
      transform 
      flex-col 
      items-start
      justify-between
      border-[1px] 
       border-white  
       border-opacity-10 
       bg-[#031016] 
       text-white/70
        transition duration-500 ease-in-out sm:w-64 xl:translate-x-0"
    >
      <div className="w-full bg-red-500 p-2 py-4">
        <div
          className=" w-full cursor-pointer select-none rounded-[8px] bg-teal-900 p-[8px] text-center text-white transition ease-in-out active:bg-transparent"
          onClick={() => reset()}
        >
          <div className="flex w-full justify-center text-sm text-white/70">
            <div>New Chat</div>
          </div>
        </div>

        <div> My Chats</div>
      </div>

      <div className=" flex flex-grow w-full bg-blue-500 p-2 py-8">

        actions: 
      </div>

      <div className="w-full bg-purple-300 p-2 py-8"> 
      
      <div className='p-3'> Account Button </div>
      
      
      </div>
    </div>
  );
};

export default Sidebar;
