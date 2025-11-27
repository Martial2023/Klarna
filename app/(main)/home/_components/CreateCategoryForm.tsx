'use client'
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from '@/components/Credenza';
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { CategoryPreviewProps } from '@/types';
import { createCategory } from '@/app/actions/actions';
import { Input } from '@/components/ui/input';
import IconPicker from '@/components/IconPicker';
import ColorPicker from '@/components/ColorPicker';
import { DEFAULT_COLOR, DEFAULT_ICON } from '@/lib/category-options';

type CreateCategoryFormProps = {
    children: React.ReactNode;
    setCategories: React.Dispatch<React.SetStateAction<CategoryPreviewProps[]>>;
}
const CreateCategoryForm = ({ children, setCategories }: CreateCategoryFormProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [budgetLimit, setBudgetLimit] = useState<number | ''>('');
    const [categoryIcon, setCategoryIcon] = useState(DEFAULT_ICON.value);
    const [categoryColor, setCategoryColor] = useState(DEFAULT_COLOR);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateCategory = async () => {
        try {
            if (!categoryName) {
                toast.error("Le nom de la catégorie est requis.");
                return;
            }
            setIsCreating(true);
            const category: CategoryPreviewProps = await createCategory({
                name: categoryName,
                limitBudget: budgetLimit === '' ? undefined : budgetLimit,
                icon: categoryIcon,
                color: categoryColor
            })
            toast.success(`Catégorie "${category.name}" créée avec succès !`);
            setCategories((prev) => [...prev, category]);
            setIsOpen(false);
            setCategoryName('');
            setBudgetLimit('');
            setCategoryIcon(DEFAULT_ICON.value);
            setCategoryColor(DEFAULT_COLOR);
        } catch (error) {
            toast.error("Erreur lors de la création de la catégorie.")
        } finally {
            setIsCreating(false);
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
                        Créer une catégorie
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaBody>
                    <Input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder='Nom de la catégorie'
                        className='mb-4'
                    />

                    <Input
                        type='number'
                        value={budgetLimit}
                        onChange={(e) => { setBudgetLimit(e.target.value === '' ? '' : Number(e.target.value)) }}
                        placeholder='Limite de budget (optionnel)'
                        className='mb-4'
                    />

                    <div className='flex flex-col md:flex-row gap-3 w-full'>
                        <div className='w-full'>
                            <h3 className='text-sm font-semibold text-foreground'>Icône</h3>
                            <IconPicker value={categoryIcon} onChange={setCategoryIcon} />
                        </div>

                        <div className='w-full'>
                            <h3 className='text-sm font-semibold text-foreground'>Couleur</h3>
                            <ColorPicker value={categoryColor} onChange={setCategoryColor} />
                        </div>
                    </div>
                </CredenzaBody>
                <CredenzaFooter className='flex flex-row justify-between items-center gap-4 w-full pt-4'>
                    <Button variant="outline" className='w-1/2' onClick={() => setIsOpen(false)}>Annuler</Button>

                    <Button
                        className='w-1/2'
                        onClick={handleCreateCategory}
                        disabled={!categoryName || isCreating}
                    >
                        {isCreating ? <Loader className='size-4 animate-spin' /> : 'Créer la catégorie'}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default CreateCategoryForm