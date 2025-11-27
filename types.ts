export interface CategoryProps {
    id: string;
    name: string;
    limitBudget?: number;
    icon?: string;
    color?: string;
    userId: string;
    expenses?: ExpenseProps[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryPreviewProps {
    id: string;
    name: string;
    limitBudget?: number;
    expensesCount: number;
    icon?: string;
    color?: string;
    totalExpensesAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ExpenseProps {
    id: string;
    title: string;
    description: string | null;
    date: Date;
    amount: number;
    userId: string;
    categoryId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryExpensesResponse {
    category: CategoryPreviewProps;
    expenses: ExpenseProps[];
}

export interface CategoryExpensesCountProps {
    category: string;
    totalAmount: number;
    totalCount: number;
}

export interface StatisticsResponse {
    totalExpenses: number;
    totalExpensesCount: number;
    totalCategories: number;
    averageExpenses: number;
    highestExpense: ExpenseProps | null;
    lowestExpense: ExpenseProps | null;
    categoryExpenses: CategoryExpensesCountProps[];
}