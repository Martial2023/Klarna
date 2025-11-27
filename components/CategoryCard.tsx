"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CategoryPreviewProps } from "@/types";
import { getCategoryIcon } from "@/lib/category-options";
import { cn } from "@/lib/utils";
import BudgetProgressBar from "@/components/BudgetProgressBar";
import Link from "next/link";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteCategoryModal from "./DeleteCategoryModal";

export type CategoryCardProps = {
    category: CategoryPreviewProps;
    setCategories?: React.Dispatch<React.SetStateAction<CategoryPreviewProps[]>>;
};

const CategoryCard = ({ category, setCategories }: CategoryCardProps) => {
    const Icon = getCategoryIcon(category.icon);
    const accentColor = category.color ?? "#000";
    const hasBudgetLimit = typeof category.limitBudget === "number";

    return (

        <Card className="w-full border-border/60 transition-shadow hover:shadow-lg p-2 pl-0 relative">
            <DeleteCategoryModal
                category={category}
                setCategories={setCategories}
            >
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="absolute top-2 right-2"
                >
                    <Trash className="size-3 text-destructive" />
                </Button>
            </DeleteCategoryModal>
            <CardHeader
                className=""
            >
                <div className="flex items-center gap-1">
                    <span
                        className="flex size-10 items-center justify-center rounded-[10px]"
                        style={{ backgroundColor: accentColor }}
                    >
                        <Icon className="size-6 text-white" />
                    </span>
                    <div>
                        <CardTitle className="text-xl font-semibold">
                            {category.name}
                        </CardTitle>
                        <CardDescription>
                            {category.expensesCount} dépense
                            {category.expensesCount > 1 ? "s" : ""}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <Link href={`/category/${category.id}`} className="group" key={category.id}>
                <CardContent className="space-y-4">
                    <div className={`flex items-center justify-between ${!category.limitBudget ? '' : 'hidden'}`}>
                        <span className="text-sm text-muted-foreground">Budget limite</span>
                        <span
                            className={cn(
                                "text-sm font-semibold",
                                hasBudgetLimit && "text-muted-foreground",
                            )}
                        >
                            Non défini
                        </span>
                    </div>
                    {
                        category.limitBudget && (
                            <BudgetProgressBar
                                current={category.totalExpensesAmount}
                                limit={category.limitBudget}
                            />
                        )
                    }
                    <span className={`${category.limitBudget ? 'hidden' : ''}`}>Total: {category.totalExpensesAmount.toLocaleString()} FCFA</span>
                </CardContent>
            </Link>
        </Card>
    );
};

export default CategoryCard;
