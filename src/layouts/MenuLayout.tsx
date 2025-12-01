interface MenuLayoutProps {
  children?: React.ReactNode;
  imageSrc: string;
}

export function MenuLayout({ children, imageSrc }: MenuLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden font-sans h-screen">
      {/* Space One: 20% - Image in center with text */}
      <div className="basis-[20%] shrink-0 relative flex items-center justify-center bg-blue-200 overflow-hidden">
        <img
          src={imageSrc}
          alt="Header"
          className="max-h-full max-w-full object-contain opacity-70"
        />
        <h1 className="absolute z-10 text-6xl font-black text-white tracking-widest drop-shadow-xl ml-10 ">
          CAT TOWN
        </h1>
      </div>

      {/* Space Two: 75% - Custom content passed by children */}
      <div className="basis-[70%] flex-1 shrink-0 overflow-auto relative">
        {children}
      </div>

      {/* Space Three: Rest (min 50px) - Copyright text */}
      <div className="basis-[10%] flex-1 bg-blue-300 flex items-center justify-center border-t border-blue-200">
        <p className="text-xs text-gray-500 font-medium tracking-wide">
          © 2025 CAT TOWN INC. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
};