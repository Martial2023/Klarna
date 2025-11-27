'use server'
import { getUser } from "@/lib/auth-session";
import { prisma } from "../../lib/prisma"
import { CategoryExpensesResponse, CategoryPreviewProps, ExpenseProps, StatisticsResponse } from "@/types";
import { Cat } from "lucide-react";


export async function getCategories(): Promise<CategoryPreviewProps[]> {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("User not authenticated")
        }
        const categories = await prisma.category.findMany({
            where: {
                userId: user.id
            },
            include: {
                expenses: true
            }
        })

        const formattedCategories: CategoryPreviewProps[] = categories.map((category) => ({
            id: category.id,
            name: category.name,
            limitBudget: category.limitBudget ?? undefined,
            icon: category.icon ?? undefined,
            color: category.color ?? undefined,
            expensesCount: category.expenses.length,
            totalExpensesAmount: category.expenses.reduce((total, expense) => total + expense.amount, 0),
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }));
        return formattedCategories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Could not fetch categories");
    }
}

type createCategoryParams = {
    name: string;
    limitBudget?: number;
    icon?: string;
    color?: string
}
export async function createCategory({ name, limitBudget, icon, color }: createCategoryParams): Promise<CategoryPreviewProps> {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("User not authenticated")
        }
        if (!name) {
            throw new Error("Name is required")
        }

        const fallbackIcon = icon ?? "PiggyBank";
        const fallbackColor = color ?? "#6366F1";

        const category = await prisma.category.create({
            data: {
                name,
                limitBudget: limitBudget ?? null,
                userId: user.id,
                icon: fallbackIcon,
                color: fallbackColor
            }
        })

        return {
            id: category.id,
            name: category.name,
            limitBudget: category.limitBudget ?? undefined,
            icon: category.icon ?? fallbackIcon,
            color: category.color ?? fallbackColor,
            expensesCount: 0,
            totalExpensesAmount: 0,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        };
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Could not create category");
    }
}

type deleteCategoryParams = {
    categoryId: string;
}
export async function deleteCategory({ categoryId }: deleteCategoryParams): Promise<void> {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("User not authenticated")
        }
        if (!categoryId) {
            throw new Error("Category ID is required")
        }

        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
                userId: user.id
            }
        })
        if (!category) {
            throw new Error("Category not found")
        }
        await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
    } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error("Could not delete category");
    }
}

type GetCategoryExpensesParams = {
    categoryId: string;
    startDate?: Date | null;
    endDate?: Date | null;
};

export async function getCategoryExpenses({
    categoryId,
    startDate,
    endDate
}: GetCategoryExpensesParams): Promise<CategoryExpensesResponse> {
    try {
        const user = await getUser();
        if (!user) {
            throw new Error("User not authenticated");
        }

        if (!categoryId) {
            throw new Error("Category ID is required");
        }

        // Récupérer la catégorie
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
                userId: user.id,
            },
            include: {
                expenses: {
                    where: {
                        createdAt: {
                            gte: startDate ?? undefined,
                            lte: endDate ?? undefined,
                        }
                    }
                },
            }
        });
        

        if (!category) {
            throw new Error("Category not found");
        }

        const formattedCategory: CategoryPreviewProps = {
            id: category.id,
            name: category.name,
            limitBudget: category.limitBudget ?? undefined,
            icon: category.icon ?? undefined,
            color: category.color ?? undefined,
            expensesCount: category.expenses.length,
            totalExpensesAmount: category.expenses.reduce((total, expense) => total + expense.amount, 0),
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }

        return {
            category: formattedCategory,
            expenses: category.expenses,
        };
    } catch (error) {
        console.error("Error fetching category expenses:", error);
        throw new Error("Could not fetch category expenses");
    }
}



type createExpenseParams = {
    categoryId: string;
    title: string;
    description: string;
    date: Date;
    amount: number;
}
export async function createExpense({ categoryId, title, description, date, amount }: createExpenseParams): Promise<ExpenseProps> {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("User not authenticated")
        }
        if (!categoryId || !title || !date || !amount) {
            throw new Error("Missing required fields")
        }
        const expense = await prisma.expense.create({
            data: {
                categoryId,
                title,
                description,
                date,
                amount,
                userId: user.id
            }
        })
        return {
            id: expense.id,
            title: expense.title,
            description: expense.description,
            date: expense.date,
            amount: expense.amount,
            userId: expense.userId,
            categoryId: expense.categoryId ?? undefined,
            createdAt: expense.createdAt,
            updatedAt: expense.updatedAt
        };
    } catch (error) {
        console.error("Error creating expense:", error);
        throw new Error("Could not create expense");
    }
}

export async function deleteExpense(expenseId: string): Promise<void> {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("User not authenticated")
        }
        if (!expenseId) {
            throw new Error("Expense ID is required")
        }
        const expense = await prisma.expense.findUnique({
            where: {
                id: expenseId,
                userId: user.id
            }
        })
        if (!expense) {
            throw new Error("Expense not found")
        }
        await prisma.expense.delete({
            where: {
                id: expenseId,
                userId: user.id
            }
        })
    } catch (error) {
        console.error("Error deleting expense:", error);
        throw new Error("Could not delete expense");
    }
}

type getAllExpensesParams = {
    startDate: Date | null;
    endDate: Date | null;
}
export async function getAllExpenses({ startDate, endDate }: getAllExpensesParams): Promise<ExpenseProps[]> {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("User not authenticated")
        }
        const expenses = await prisma.expense.findMany({
            where: {
                userId: user.id,
                createdAt: {
                    gte: startDate ?? undefined,
                    lte: endDate ?? undefined,
                }
            }
        })
        return expenses
    } catch (error) {
        console.error("Error fetching all expenses:", error);
        throw new Error("Could not fetch all expenses");
    }
}


type getStatisticsParams = {
    startDate: Date | null;
    endDate: Date | null;
};
export async function getStatistics({ startDate, endDate }: getStatisticsParams): Promise<StatisticsResponse> {
    try {
        const user = await getUser();
        if (!user) {
            throw new Error("User not authenticated");
        }

        // Fetch all categories (to map category names later)
        const fetchedCategories = await prisma.category.findMany({
            where: {
                userId: user.id,
                updatedAt: {
                    gte: startDate ?? undefined,
                    lte: endDate ?? undefined,
                },
            },
        });

        // Fetch all expenses in the date range
        const fetchedExpenses = await prisma.expense.findMany({
            where: {
                userId: user.id,
                date: {
                    gte: startDate ?? undefined,
                    lte: endDate ?? undefined,
                },
            },
            include: {
                category: true,
            },
        });

        // --- Base statistics ---
        const totalExpenses = fetchedExpenses.reduce((total, expense) => total + expense.amount, 0);
        const totalExpensesCount = fetchedExpenses.length;
        const totalCategories = new Set(fetchedExpenses.map(e => e.categoryId)).size;
        const averageExpenses = totalExpensesCount > 0 ? totalExpenses / totalExpensesCount : 0;

        const highestExpense =
            fetchedExpenses.reduce(
                (max, expense) => (expense.amount > (max?.amount ?? 0) ? expense : max),
                null as ExpenseProps | null
            );

        const lowestExpense =
            fetchedExpenses.reduce(
                (min, expense) => (expense.amount < (min?.amount ?? Infinity) ? expense : min),
                null as ExpenseProps | null
            );

        // --- Compute categoryExpenses ---
        const categoryExpensesMap: Record<string, { totalAmount: number; totalCount: number }> = {};

        for (const expense of fetchedExpenses) {
            const id = expense.categoryId;
            if (!categoryExpensesMap[id]) {
                categoryExpensesMap[id] = { totalAmount: 0, totalCount: 0 };
            }
            categoryExpensesMap[id].totalAmount += expense.amount;
            categoryExpensesMap[id].totalCount += 1;
        }

        const categoryExpenses = Object.entries(categoryExpensesMap).map(([categoryId, stats]) => ({
            category: fetchedCategories.find(c => c.id === categoryId)?.name ?? "Unknown category",
            totalAmount: stats.totalAmount,
            totalCount: stats.totalCount,
        }));

        // --- Final Response ---
        const formattedResponse: StatisticsResponse = {
            totalExpenses,
            totalExpensesCount,
            totalCategories,
            averageExpenses,
            highestExpense,
            lowestExpense,
            categoryExpenses,
        };

        return formattedResponse;

    } catch (error) {
        console.error("Error fetching statistics:", error);
        throw new Error("Could not fetch statistics");
    }
}