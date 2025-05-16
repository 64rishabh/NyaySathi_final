
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Users, 
  Bookmark, 
  List,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  {
    title: "Constitutional Articles",
    path: "/legal-library/constitution",
    icon: <BookOpen className="mr-2 h-5 w-5" />
  },
  {
    title: "Criminal Laws",
    path: "/legal-library/criminal",
    icon: <FileText className="mr-2 h-5 w-5" />
  },
  {
    title: "Civil Laws",
    path: "/legal-library/civil",
    icon: <FileText className="mr-2 h-5 w-5" />
  },
  {
    title: "Family Laws",
    path: "/legal-library/family",
    icon: <Users className="mr-2 h-5 w-5" />
  },
  {
    title: "Important Judgements",
    path: "/legal-library/judgements",
    icon: <Bookmark className="mr-2 h-5 w-5" />
  },
  {
    title: "Chief Justices of India",
    path: "/legal-library/cji",
    icon: <List className="mr-2 h-5 w-5" />
  }
];

const SidebarNav = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = React.useState(isMobile);

  React.useEffect(() => {
    // Only set collapsed state based on isMobile when the screen size changes
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <div 
      className={cn(
        "bg-slate-50 border-r transition-all duration-300",
        // On mobile: collapsed = hidden (w-0), expanded = full sidebar (w-64)
        // On desktop: always visible (w-64), never collapses
        isMobile 
          ? collapsed ? "w-0 overflow-hidden" : "w-64 absolute z-20 h-[calc(100vh-4rem)]" 
          : "w-64 h-[calc(100vh-4rem)]"
      )}
    >
      {/* Only show collapse button on mobile */}
      {isMobile && (
        <div className="flex justify-end p-2">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-slate-200"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
      )}
      
      <nav className="px-2 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-legal-primary text-white" 
                    : "text-slate-700 hover:bg-slate-200"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Mobile menu toggle button - only shown on mobile */}
      {isMobile && (
        <button
          className="fixed bottom-4 left-4 z-30 p-3 rounded-full bg-legal-primary text-white shadow-lg"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Open menu" : "Close menu"}
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SidebarNav;