import React, { useState } from 'react'
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/Credenza"
import { Button } from "@/components/ui/button"
import { Loader } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import Image from 'next/image'
import { CategoryPreviewProps } from '@/types'
import { toast } from 'sonner'
import { deleteCategory } from '@/app/actions/actions'

type Props = {
    children: React.ReactNode;
    category: CategoryPreviewProps;
    setCategories?: React.Dispatch<React.SetStateAction<CategoryPreviewProps[]>>;
}
const DeleteCategoryModal = ({ children, category, setCategories }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeletingCategory, setIsDeletingCategory] = useState<boolean>(false);

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            if (isDeletingCategory) return;
            setIsDeletingCategory(true);
            await deleteCategory({
                categoryId
            });
            setCategories?.((prev) => prev.filter((category) => category.id !== categoryId));
            toast.success("Catégorie supprimée avec succès");
            setIsOpen(false);
        } catch (error) {
            toast.error("Erreur lors de la suppression de la catégorie")
        } finally {
            setIsDeletingCategory(false);
        }
    }

    return (
        <Credenza open={isOpen} onOpenChange={setIsOpen}>
            <CredenzaTrigger asChild>
                { children }
            </CredenzaTrigger>

            <CredenzaContent className="border-none shadow-xl dark:bg-zinc-900 mx-0.5">
                <CredenzaHeader className="">
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
                    <CredenzaDescription className="text-destructive text-sm italic text-center">
                        Supprimer la catégorie "{category.name}"
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaBody>
                    <p className='text-sm text-foreground text-center'>Êtes-vous sûr de vouloir supprimer la catégorie "{category.name}" ?</p>
                    <p className='text-sm text-foreground text-center'>Cette action est irréversible. 
                        {category.expensesCount > 0 && ` Ses ${category.expensesCount} dépense${category.expensesCount > 1 ? "s" : ""} seront également supprimées.`}
                    </p>
                </CredenzaBody>
                <CredenzaFooter className='flex flex-row items-center gap-4 w-full border-t pt-2'>
                    <Button variant="outline" className='w-1/2' onClick={() => setIsOpen(false)}>Annuler</Button>
                    <Button variant="destructive" className='w-1/2' disabled={isDeletingCategory} onClick={() => void handleDeleteCategory(category.id)}>
                        {isDeletingCategory ? <Loader className='size-4 animate-spin'/> : "Oui supprimer"}
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default DeleteCategoryModal