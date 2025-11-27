'use client'

import { CategoryPreviewProps } from "@/types";
import { useCallback, useEffect, useState } from "react";
import CreateCategoryForm from "./_components/CreateCategoryForm";
import { Button } from "@/components/ui/button";
import { Blocks } from "lucide-react";
import { toast } from "sonner";
import { getCategories } from "@/app/actions/actions";
import MinLoader from "@/components/MinLoader";
import CategoryCard from "@/components/CategoryCard";

const HomePage = () => {
  const [categories, setCategories] = useState<CategoryPreviewProps[]>([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState<boolean>(false);

  const handleFetchCategories = useCallback(async () => {
    try {
      setIsFetchingCategories(true)
      const fetchedCategories: CategoryPreviewProps[] = await getCategories()
      setCategories(fetchedCategories)
    } catch {
      toast.error("Erreur lors de la récupération des catégories")
    } finally {
      setIsFetchingCategories(false)
    }
  }, [])


  useEffect(() => {
    void handleFetchCategories()
  }, [handleFetchCategories])

  return (
    <main className="min-h-screen space-y-8 pb-16 pt-6 md:px-[10%]">
      <div className="w-full px-2">
        <CreateCategoryForm setCategories={setCategories}>
          <Button>Ajouter une catégorie</Button>
        </CreateCategoryForm>
      </div>

      {isFetchingCategories ? (
        <div className="flex items-center justify-center py-20">
          <MinLoader />
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              setCategories={setCategories}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-border/60 bg-card/60 p-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-border/40 bg-background/80">
              <Blocks className="size-6 text-muted-foreground" />
            </span>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Aucune catégorie</h4>
            </div>
          </div>
          <CreateCategoryForm setCategories={setCategories}>
            <Button>Créer une catégorie</Button>
          </CreateCategoryForm>
        </div>
      )}
    </main>
  )
}

export default HomePage