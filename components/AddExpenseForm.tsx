'use client'
import React, { useState } from 'react'
import { CategoryPreviewProps, ExpenseProps } from '@/types'
import { toast } from 'sonner'
import { createExpense } from '../app/actions/actions'
import { Credenza, CredenzaBody, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from './Credenza'
import { Loader } from 'lucide-react'
import ColorPicker from './ColorPicker'
import IconPicker from './IconPicker'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Image from 'next/image'
import { Textarea } from './ui/textarea'

type Props = {
  children: React.ReactNode
  categoryId: string
  category: CategoryPreviewProps | null
  setCategory: React.Dispatch<React.SetStateAction<CategoryPreviewProps | null>>
  categoryExpenses: ExpenseProps[]
  setCategoryExpenses: React.Dispatch<React.SetStateAction<ExpenseProps[]>>
}
const AddExpenseForm = ({ children, categoryId, category, setCategory, categoryExpenses, setCategoryExpenses }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [amount, setAmount] = useState<number>(0)

  const handleCreateExpense = async () => {
    try {
      if (!title || amount === 0) {
        toast.error('Title and amount are required.')
        return
      }
      setIsCreating(true)
      const expense = await createExpense({
        categoryId: categoryId,
        title,
        description,
        date,
        amount
      })
      setCategoryExpenses([expense, ...categoryExpenses])
      if (category) {
        setCategory({
          ...category,
          expensesCount: category.expensesCount + 1,
          totalExpensesAmount: category.totalExpensesAmount + amount
        })
      }
      toast.success('Expense created successfully.')
      setIsOpen(false)
      setTitle('')
      setDescription('')
      setAmount(0)
      setDate(new Date())
    } catch (error) {
      toast.error('Failed to create expense. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }
  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        {children}
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
          </CredenzaTitle>
          <CredenzaDescription className="text-gray-500 text-sm italic">
            Ajouter une dépense
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Nom de la dépense'
            className='mb-4'
          />

          <Input
            type='number'
            value={amount}
            onChange={(e) => { setAmount(Number(e.target.value)) }}
            placeholder='Montant'
            className='mb-4'
          />

          <Input
            type='date'
            value={date.toISOString().split('T')[0]}
            onChange={(e) => { setDate(new Date(e.target.value)) }}
            className='mb-4'
          />

          <Textarea
            value={description}
            className='resize-none'
            placeholder='description (optionnelle)'
            onChange={(e) => { setDescription(e.target.value) }}
          />

        </CredenzaBody>
        <CredenzaFooter className='flex flex-row justify-between items-center gap-2 w-full'>
          <Button variant="outline" className='w-1/2' onClick={() => setIsOpen(false)}>Annuler</Button>

          <Button
            className='w-1/2'
            onClick={handleCreateExpense}
            disabled={!title || amount === 0 || isCreating}
          >
            {isCreating ? <Loader className='size-4 animate-spin' /> : 'Ajouter la dépense'}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export default AddExpenseForm