import React from 'react'
import Image from 'next/image'
import { Trio } from "ldrs/react"
import 'ldrs/react/Trio.css'



const IsLoading = () => {
    return (
        <main className='h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='w-full flex items-center justify-center'>
                    <h2 className="text-2xl font-bold flex items-center">
                        <Image
                            src={"/logo2.svg"}
                            width={22}
                            height={40}
                            className="text-primary-500 dark:hidden"
                            alt="ClientManager"
                        />
                        <Image
                            src={"/logo-dark.svg"}
                            width={22}
                            height={40}
                            className="text-primary-500 hidden dark:block"
                            alt="ClientManager"
                        />
                        <span className="text-primary">{process.env.NEXT_PUBLIC_NAME_FIRST}</span>
                        <span className="dark:text-white">{process.env.NEXT_PUBLIC_NAME_SECOND}</span>
                    </h2>
                </div>

                <div className=''>
                    <Trio
                        size="40"
                        speed="1.4"
                        color="orange"
                    />
                </div>
            </div>
        </main>
    )

}

export default IsLoading