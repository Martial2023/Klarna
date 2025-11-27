import React, { useState, useEffect } from 'react'
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/Credenza"
import { Button } from "@/components/ui/button"
import { LogIn, LucideIcon, Menu, ChevronRight, LogOut } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { signOut } from "@/lib/auth-client";
import { UserButton } from './UserButton'

type NavLink = {
    label: string,
    href: string,
    icon: LucideIcon
}

type Props = {
    navlinks: NavLink[]
}

const MobileNav = ({ navlinks }: Props) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        // Set active link based on current route
        const currentPath = pathname;
        const activeNavLink = navlinks.find(link => link.href === currentPath);
        if (activeNavLink) {
            setActiveLink(activeNavLink.href);
        }
    }, [pathname, navlinks]);

    const handleClose = () => {
        document.getElementById('close_mobilenav')?.click();
    };

    const router = useRouter();
    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        });
    };

    return (
        <Credenza open={isOpen} onOpenChange={setIsOpen}>
            <CredenzaTrigger asChild>
                <Button size={"sm"} className="items-center gap-2 flex p-1 cursor-pointer hover:bg-primary-500/80 lg:hidden"
                    id='close_mobilenav'
                >
                    <Menu className='' />
                </Button>
            </CredenzaTrigger>

            <CredenzaContent className="border-none shadow-xl dark:bg-zinc-900 mx-0.5">
                <CredenzaHeader className="pb-2">
                    <CredenzaTitle className="text-3xl font-semibold text-primary flex items-center justify-between">
                        <span className="text-xl font-bold flex items-center">
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
                        </span>

                        <ThemeToggle />
                    </CredenzaTitle>
                    <CredenzaDescription className="text-gray-500 text-sm italic">
                        Tracquez vos finances
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaBody>
                    <ul className="space-y-1 p-2">
                        {navlinks.map((item, index) => (
                            <li
                                key={index}
                                className={`
                                    rounded-lg p-2 transition-all duration-300 ease-in-out
                                    ${activeLink === item.href ? 'bg-primary-50 dark:bg-zinc-800' : ''}
                                `}
                            >
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center justify-between w-full
                                        ${activeLink === item.href ? 'text-xl text-primary-500 font-semibold' : 'dark:text-gray-200'}
                                    `}
                                    onClick={handleClose}
                                >
                                    <div className="flex items-center">
                                        <item.icon className={`size-4 mr-2 ${activeLink === item.href ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400'}`} />
                                        {item.label}
                                    </div>
                                    {activeLink === item.href && (
                                        <ChevronRight className="w-4 h-4 text-primary-500" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CredenzaBody>
                <CredenzaFooter className='flex flex-row items-center gap-4 w-full border-t pt-2'>
                    <UserButton />
                    <Button onClick={handleSignOut} variant={"destructive"} className="w-full">
                        <LogOut className="mr-2 h-4 w-4 text-white" />
                        <span>Se déconnecter</span>
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default MobileNav