"use client";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const AnimatedSidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <>
      <DesktopSidebar className={className}>{children}</DesktopSidebar>
      <MobileSidebar className={className}>{children}</MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-screen px-4 py-6 hidden md:flex md:flex-col flex-shrink-0 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 shadow-2xl",
        className
      )}
      animate={{
        width: animate ? (open ? "320px" : "80px") : "320px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-16 px-3 py-3 flex flex-row md:hidden items-center justify-between w-full bg-gradient-to-r from-gray-900 to-purple-900 shadow-lg fixed top-0 left-0 right-0 z-50"
        )}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <img 
              src="https://storage.googleapis.com/cluvi/Ya_Quedo/final_logo_yaquedo.png" 
              alt="Ya Quedo Logo" 
              className="h-8 w-auto object-contain max-w-[120px]"
            />
          </div>
          <Menu
            className="text-white cursor-pointer hover:text-purple-200 transition-colors"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <>
              {/* Overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="fixed inset-0 bg-black/50 z-[90] md:hidden"
                onClick={() => setOpen(false)}
              />
              
              {/* Sidebar drawer */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={cn(
                  "fixed left-0 top-0 h-full w-72 max-w-[80vw] p-4 z-[100] flex flex-col justify-between bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 shadow-2xl",
                  className
                )}
              >
                <div
                  className="absolute right-4 top-4 z-50 text-white cursor-pointer hover:text-purple-200 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" />
                </div>
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  isActive = false,
  ...props
}: {
  link: Links;
  className?: string;
  isActive?: boolean;
}) => {
  const { open, animate, setOpen } = useSidebar();
  
  const handleClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };
  
  return (
    <Link
      to={link.href}
      onClick={handleClick}
      className={cn(
        "flex items-center rounded-xl transition-all duration-200 outline-none focus:outline-none focus:ring-0 group",
        open 
          ? "justify-start gap-3 py-3 px-3" 
          : "justify-center py-3 px-2",
        isActive 
          ? "bg-purple-600 text-white hover:bg-purple-600 shadow-lg" 
          : "text-purple-200 hover:bg-purple-700/50 hover:text-white",
        className
      )}
      {...props}
    >
      <div className={cn(
        "flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
        open ? "h-5 w-5" : "h-6 w-6"
      )}>
        {link.icon}
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm font-medium transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};