'use client'
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
import { ExpenseProps } from "@/types";
import Image from "next/image"

type Props = {
    children: React.ReactNode;
    expense: ExpenseProps
}
const ShowExpenseDetails = ({ children, expense }: Props) => {
    const formatDisplayDate = (value: Date) =>
        new Date(value).toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })

    const formattedAmount = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        maximumFractionDigits: 0,
    }).format(expense.amount)

    const formattedDate = formatDisplayDate(expense.date)
    const formattedCreatedAt = formatDisplayDate(expense.createdAt)
    const formattedUpdatedAt = formatDisplayDate(expense.updatedAt)

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                { children }
            </CredenzaTrigger>

            <CredenzaContent className="mx-0.5 border-none shadow-xl dark:bg-zinc-900">
                <CredenzaHeader className="pb-2">
                    <CredenzaTitle className="flex items-center justify-between text-3xl font-semibold text-primary">
                        <span className="flex items-center text-xl font-bold">
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

                    </CredenzaTitle>
                    <CredenzaDescription className="text-gray-500 text-sm italic">
                        Tracquez vos finances
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaBody className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
                    <section className="space-y-2">
                        <h4 className="text-2xl font-semibold text-primary dark:text-primary">
                            {expense.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {expense.description ?? "Aucune description renseignée pour cette dépense."}
                        </p>
                    </section>

                    <section className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                            <span className="text-xs uppercase tracking-wide text-muted-foreground">Montant</span>
                            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{formattedAmount}</p>
                        </div>
                        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                            <span className="text-xs uppercase tracking-wide text-muted-foreground">Date</span>
                            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">{formattedDate}</p>
                        </div>
                        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                            <span className="text-xs uppercase tracking-wide text-muted-foreground">Ajoutée le</span>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{formattedCreatedAt}</p>
                        </div>
                    </section>
                </CredenzaBody>
                <CredenzaFooter className="pt-2">
                    <CredenzaClose className="w-full cursor-pointer">Fermer</CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default ShowExpenseDetails