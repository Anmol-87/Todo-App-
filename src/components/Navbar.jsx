function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl m-2">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌟</span>
          <h1 className="text-2xl font-bold tracking-wide text-white">iTask</h1>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-white/90">
          {["Home", "My Tasks", "Focus"].map((item) => (
            <li
              key={item}
              className="relative cursor-pointer
                         hover:text-white
                         transition-all duration-300
                         hover:scale-105
                         after:content-['']
                         after:absolute after:left-0 after:-bottom-1
                         after:w-0 after:h-[2px] after:bg-white
                         after:transition-all after:duration-300
                         hover:after:w-full
                         hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <button
          className="relative bg-red-500/80 text-white px-5 py-2 rounded-full font-semibold
                     transition-all duration-300
                     hover:bg-red-500 hover:scale-105
                     hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        >
          + Add Task
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
