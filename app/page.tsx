import Image from "next/image";
import Link from "next/link";
import { Button } from "react-aria-components";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full flex items-center justify-center mb-1'>
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
        </div>

        <div>
          <p>Bienvenue sur Klarna! Commencez à gérer vos finances dès aujourd'hui.</p>
          <Link href={"/sign-in"}>
            <Button>
              Commencer
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
