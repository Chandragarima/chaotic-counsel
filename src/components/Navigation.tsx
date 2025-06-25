import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  const handleHomeClick = () => {
    navigate('/');
  };

  // Don't show navigation on home page
  if (isHomePage) return null;

  return (
    
    <nav className="absolute top-0 left-0 right-0 z-50 p-0">
      <div className="flex justify-start">
        <button
          onClick={handleHomeClick}
          className=" relative flex justify-center gap-2 px-2 py-2 rounded-full
                   bg-slate-800/20 backdrop-blur-md border border-amber-400/20
                   hover:bg-slate-800/30 hover:border-amber-400/40
                   transition-all duration-300 ease-out
                   hover:scale-105 active:scale-95
                   shadow-lg hover:shadow-xl hover:shadow-amber-400/10"
        >
          {/* Glassmorphic inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/5 to-amber-300/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Home icon */}
          <Home 
            size={18} 
            className="text-amber-300/80 group-hover:text-amber-200 transition-colors duration-300
                     group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" 
          />
          
          {/* Home text */}
          {/* <span className="text-sm font-medium text-amber-100/90 group-hover:text-amber-50
                         transition-colors duration-300 tracking-wide">
            Home
          </span> */}
          
          {/* Playful sparkle effect on hover */}
          {/* <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        group-hover:animate-pulse"></div> */}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
