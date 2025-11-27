'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { deleteExpense, getCategoryExpenses } from '@/app/actions/actions';
import { CategoryPreviewProps, ExpenseProps } from '@/types';
import { Button } from '@/components/ui/button';
import MinLoader from '@/components/MinLoader';
import { Bird, Eye, Loader, Trash } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ShowExpenseDetails from '@/components/ShowExpenseDetails';
import AddExpenseForm from '@/components/AddExpenseForm';
import DateRangePickerComponent from '@/components/DateRangePicker';
import CategoryCard from '@/components/CategoryCard';

const page = () => {
    const params = useParams();
    const categoryId = params?.categoryId as string;
    const [isFetchingCategory, setIsFetchingCategory] = useState(false);
    const [isDeletingExpense, setIsDeletingExpense] = useState(false);
    const [itemDeletingId, setItemDeletingId] = useState<string | null>(null);
    const [categoryExpenses, setCategoryExpenses] = useState<ExpenseProps[]>([]);
    const [category, setCategory] = useState<CategoryPreviewProps | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleFetchCategoryExpenses = async () => {
        try {
            setIsFetchingCategory(true);
            const responses = await getCategoryExpenses({ 
                categoryId,
                startDate,
                endDate
            })
            setCategoryExpenses(responses.expenses);
            setCategory(responses.category);
        } catch (error) {
            toast.error("Erreur lors de la récupération des dépenses de la catégorie")
        } finally {
            setIsFetchingCategory(false);
        }
    }
    useEffect(() => {
        void handleFetchCategoryExpenses();
    }, [categoryId, startDate, endDate])

    const handleDeleteExpense = async (expenseId: string) => {
        try {
            setIsDeletingExpense(true);
            setItemDeletingId(expenseId);
            await deleteExpense(expenseId);
            setCategoryExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
            toast.success("Dépense supprimée avec succès");
            setCategory({
                ...category!,
                expensesCount: category!.expensesCount - 1,
                totalExpensesAmount: category!.totalExpensesAmount - (categoryExpenses.find(expense => expense.id === expenseId)?.amount || 0)
            })
        } catch {
            toast.error("Erreur lors de la suppression de la dépense")
        } finally {
            setIsDeletingExpense(false);
            setItemDeletingId(null);
        }
    }
    return (
        <div className='pt-6 p-2'>

            <div className='mt-4 mb-2 p-4 bg-card/60 text-sm text-muted-foreground flex items-center gap-4 max-w-md'>
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
                isFetchingCategory ? (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <MinLoader />
                        Chargement des dépenses...
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 md:gap-4 w-full'>
                        <div className='w-full flex flex-col space-y-2 col-span-1'>
                            {category && (
                                <CategoryCard category={category} />
                            )}

                            <div className='w-full'>
                                <AddExpenseForm
                                    categoryId={categoryId}
                                    category={category}
                                    setCategory={setCategory}
                                    categoryExpenses={categoryExpenses}
                                    setCategoryExpenses={setCategoryExpenses}
                                >
                                    <Button className='w-full'>Ajouter une dépense</Button>
                                </AddExpenseForm>
                            </div>
                        </div>

                        <div className='col-span-2'>
                            {
                                categoryExpenses.length === 0 ? (
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
                                                {categoryExpenses.map((item) => (
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
                    </div>
                )
            }


        </div>
    )
}

export default page