'use client';

import { ChartNoAxesCombined, ChartNoAxesGantt, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import MobileNav from './MobileNav'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton } from './UserButton';


const Navbar = () => {
  const isLoadingUser = true
  const pathname = usePathname();
  const [activeLink, setActiveLink] = React.useState<string>('');

  const navlinks = [
    {
      label: "Acceuil",
      href: "/home",
      icon: HomeIcon,
    },

    {
      label: "Dépenses",
      href: "/expenses",
      icon: ChartNoAxesGantt,
    },

    {
      label: "Statistiques",
      href: "/statistics",
      icon: ChartNoAxesCombined,
    }
  ];

  useEffect(() => {
    const currentPath = pathname;
    const activeNavLink = navlinks.find(link => link.href === currentPath);
    if (activeNavLink) {
      setActiveLink(activeNavLink.href);
    }
  }, [pathname, navlinks]);


  return (
    <nav className="w-full p-2 md:px-[10%] flex items-center justify-between fixed z-30 top-0 left-0 bg-white dark:bg-zinc-900">
      <Link href="/home" className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold flex items-center">
          <Image
            src={"/logo2.svg"}
            width={24}
            height={40}
            className="text-primary-500 dark:hidden"
            alt="ClientManager"
          />
          <Image
            src={"/logo-dark.svg"}
            width={24}
            height={40}
            className="text-primary-500 hidden dark:block"
            alt="ClientManager"
          />
          <span className="text-primary">Klarna</span>
        </h2>
      </Link>

      <div className="hidden lg:flex items-center gap-4">
        {navlinks.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className={`flex items-center text-sm transition ${item.href === activeLink ? 'font-semibold text-xl' : ''} ${item.href === '#' && isLoadingUser ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary-500'
              }`}
          >
            <item.icon className="size-4 mr-1" />
            {item.label}
          </Link>
        ))}
      </div>
      
      <div className='hidden md:block'>
        <UserButton />
      </div>

      <MobileNav
        navlinks={navlinks}
      />
    </nav>
  );
};

export default Navbar;