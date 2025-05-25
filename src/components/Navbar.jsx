const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-slate-700 text-white w-full h-[60px] ">
      <div className="l font-bold text-xl flex items-center ">
        <span className="text-3xl text-green-500">&lt;</span>
        <span>Your</span> <span className="text-green-500">Passwords</span>
          <span className="text-3xl text-green-500">/&gt;</span>
          </div>
      <div className="r hidden md:block">
        <ul className="flex gap-6 justify-center items-center text-white  ">
          <li className="hover:scale-x-125 cursor-pointer hover:text-blue-400">Home</li>
          <li className="hover:scale-x-125 cursor-pointer hover:text-blue-400">About</li>
          <li className="hover:scale-x-125 cursor-pointer hover:text-blue-400">Contact Us</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
