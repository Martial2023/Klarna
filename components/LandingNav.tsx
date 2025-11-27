'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"
import Logo from "./Logo"

export default function LandingNav() {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        if (typeof window === "undefined") return

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header>
            <nav data-state={menuState && "active"} className="fixed z-20 w-full px-2 group">
                <div
                    className={cn(
                        "mx-auto mt-1 max-w-4xl px-4 transition-all duration-300 lg:px-8",
                        isScrolled && "bg-background/50 max-w-3xl rounded-2xl border backdrop-blur-lg lg:px-4",
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-0">
                        <div className="flex w-full justify-between lg:w-auto">
                            <a href="/" aria-label="home" className="flex items-center space-x-2">
                                <Logo />
                            </a>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent dark:shadow-none dark:lg:bg-transparent">
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Link href={"/sign-in"}>
                                    <Button variant="outline" size="sm" className={cn(isScrolled && "lg:hidden cursor-pointer", "w-full")}>
                                        <span>Se connecter</span>
                                    </Button>
                                </Link>

                                <Link href={"/sign-in"}>
                                    <Button
                                        size="sm"
                                        className={cn(
                                            isScrolled
                                                ? "lg:inline-flex"
                                                : "hidden",
                                                "w-full"
                                        )}
                                    >
                                        <span>Commencer</span>
                                    </Button>
                                </Link>

                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}