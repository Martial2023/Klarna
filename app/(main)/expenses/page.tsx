'use client'

import { deleteExpense, getAllExpenses } from "@/app/actions/actions";
import DateRangePickerComponent from "@/components/DateRangePicker";
import MinLoader from "@/components/MinLoader";
import ShowExpenseDetails from "@/components/ShowExpenseDetails";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExpenseProps } from "@/types";
import { Expense } from "@prisma/client";
import { Bird, Eye, Loader, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

const page = () => {
    const [isGettingExpenses, setIsGettingExpenses] = useState(false);
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [isDeletingExpense, setIsDeletingExpense] = useState(false);
    const [itemDeletingId, setItemDeletingId] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const hangleGetExpenses = async () => {
        try {
            setIsGettingExpenses(true);
            const expensesResponse = await getAllExpenses({
                startDate,
                endDate
            })
            setExpenses(expensesResponse);
        } catch (error) {
            toast.error("Erreur lors de la récupération des dépenses")
        } finally {
            setIsGettingExpenses(false);
        }
    }
    const handleDeleteExpense = async (expenseId: string) => {
        try {
            setIsDeletingExpense(true);
            setItemDeletingId(expenseId);
            await deleteExpense(expenseId);
            setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
            toast.success("Dépense supprimée avec succès");
        } catch {
            toast.error("Erreur lors de la suppression de la dépense")
        } finally {
            setIsDeletingExpense(false);
            setItemDeletingId(null);
        }
    }

    useEffect(() => {
        hangleGetExpenses();
    }, [startDate, endDate]);
    return (
        <main className="min-h-screen p-2 pt-4 md:pt-8">
            <div className='md:mt-4 mb-2 p-4 bg-card/60 text-sm text-muted-foreground flex items-center gap-4 max-w-md'>
                <span className="font-semibold">
                    Période:
                </span>
                <DateRangePickerComponent
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>

            {
                isGettingExpenses ? (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <MinLoader />
                        Chargement des dépenses...
                    </div>
                ) : (
                    <div className=''>
                        {
                            expenses.length === 0 ? (
                                <div className='w-full flex flex-col items-center justify-center h-48'>
                                    <Bird className='size-12 text-muted-foreground' />
                                    Aucune dépense trouvée

                                </div>
                            ) : (
                                <div>
                                    <Table>
                                        <TableHeader className="bg-transparent">
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead>Titre</TableHead>
                                                <TableHead>Montant</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Action</TableHead>
                                                <TableHead>Voir</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <tbody aria-hidden="true" className="table-row h-2" />
                                        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
                                            {expenses.map((item) => (
                                                <TableRow
                                                    className="border-none odd:bg-muted/50 hover:bg-transparent odd:hover:bg-muted/50"
                                                    key={item.id}
                                                >
                                                    {/* <ShowExpenseDetails expense={item}>
                                                            <div>
                                                                
                                                            </div>
                                                        </ShowExpenseDetails> */}

                                                    <TableCell className="py-2.5 cursor-pointer">
                                                        {item.title}
                                                    </TableCell>
                                                    <TableCell className="py-2.5 font-medium">{item.amount}</TableCell>
                                                    <TableCell className="py-2.5">{new Date(item.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                                    <TableCell className="py-2.5">
                                                        <Button
                                                            onClick={() => handleDeleteExpense(item.id)}
                                                            variant={"ghost"}
                                                        >
                                                            {
                                                                isDeletingExpense && item.id === itemDeletingId ? (
                                                                    <Loader className='size-4 animate-spin' />
                                                                ) : (
                                                                    <Trash className='text-destructive size-3' />
                                                                )
                                                            }
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="py-2.5">
                                                        <ShowExpenseDetails expense={item}>
                                                            <Button variant={"link"}>
                                                                <Eye className='size-4' />
                                                            </Button>
                                                        </ShowExpenseDetails>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </main>
    )
}

export default page