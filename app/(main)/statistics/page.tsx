'use client'

import { getStatistics } from "@/app/actions/actions";
import DateRangePickerComponent from "@/components/DateRangePicker";
import MinLoader from "@/components/MinLoader";
import { StatisticsResponse } from "@/types";
import { ChartNoAxesCombined, ChartNoAxesGantt, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ChartCategoryExpensesCount from "./_components/ChartCategoryExpensesCount";
import AIAnalysis from "./_components/AIAnalysis";
import ShowExpenseDetails from "@/components/ShowExpenseDetails";

const page = () => {
  const [isGettingStatistics, setIsGettingStatistics] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statisticsResponse, setStatisticsResponse] = useState<StatisticsResponse>();

  const handleGetStatistics = async () => {
    try {
      setIsGettingStatistics(true);
      const response = await getStatistics({
        startDate,
        endDate
      })
      setStatisticsResponse(response);
    } catch (error) {
      toast.error("Erreur lors de la récupération des statistiques")
    } finally {
      setIsGettingStatistics(false);
    }
  }

  useEffect(() => {
    void handleGetStatistics();
  }, [startDate, endDate]);

  if (isGettingStatistics) {
    return (
      <main className='min-h-screen p-2 pt-8 flex items-center justify-center'>
        <div className="flex flex-col items-center justify-center gap-2">
          <MinLoader />
          <p className="text-sm text-foreground">Chargement des statistiques...</p>
        </div>
      </main>
    )
  }
  return (
    <main className='min-h-screen p-2 pt-4 md:pt-8'>
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

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="col-span-1 p-4 bg-card/60 rounded-md shadow-sm flex gap-2 items-center cursor-pointer hover:bg-card/70 transition">
          <div className="size-10 rounded-xl bg-black dark:bg-white flex items-center justify-center">
            <Plus className="text-white dark:text-black size-6" />
          </div>
          <div className="flex flex-col">
            <span>{statisticsResponse?.totalExpenses}</span>
            <span className="font-semibold">FCFA</span>
          </div>
        </div>
        <div className="col-span-1 p-4 bg-card/60 rounded-md shadow-sm flex gap-2 items-center cursor-pointer hover:bg-card/70 transition">
          <div className="size-10 rounded-xl bg-black dark:bg-white flex items-center justify-center">
            <ChartNoAxesGantt className="text-white dark:text-black size-6" />
          </div>
          <div className="flex flex-col">
            <span>{statisticsResponse?.totalExpensesCount}</span>
            <span className="font-semibold">Dépenses</span>
          </div>
        </div>
        <div className="col-span-1 p-4 bg-card/60 rounded-md shadow-sm flex gap-2 items-center cursor-pointer hover:bg-card/70 transition">
          <div className="size-10 rounded-xl bg-black dark:bg-white flex items-center justify-center">
            <ChartNoAxesCombined className="text-white dark:text-black size-6" />
          </div>
          <div className="flex flex-col">
            <span>{statisticsResponse?.averageExpenses.toFixed(2)}FCFA</span>
            <span className="font-semibold">en moyenne</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="col-span-1 md:col-span-2 bg-gray-100 dark:bg-zinc-900 p-3 rounded-xl md:h-96">
          <ChartCategoryExpensesCount
            data={statisticsResponse?.categoryExpenses || []}
          />
        </div>

        <div className="col-span-1 rounded-xl bg-gray-100/10 dark:bg-zinc-900/10 space-y-4">
          {
            statisticsResponse?.highestExpense && (
              <ShowExpenseDetails expense={statisticsResponse.highestExpense}>
                <div className="rounded-xl bg-gray-100 dark:bg-zinc-900 p-4 mb-4 cursor-pointer">
                  <h3 className="text-sm font-semibold">Dépense max</h3>
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">{statisticsResponse.highestExpense.title}</span>
                    <span className="text-sm text-muted-foreground line-clamp-2">{statisticsResponse.highestExpense.description}</span>
                    <span className="font-bold">{statisticsResponse.highestExpense.amount} FCFA</span>
                  </div>
                </div>
              </ShowExpenseDetails>

            )
          }
          {
            statisticsResponse?.lowestExpense && (
              <ShowExpenseDetails expense={statisticsResponse.lowestExpense}>
                <div className="rounded-xl bg-gray-100 dark:bg-zinc-900 p-4 cursor-pointer">
                  <h3 className="text-sm font-semibold">Dépense min</h3>
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">{statisticsResponse.lowestExpense.title}</span>
                    <span className="text-sm text-muted-foreground line-clamp-2">{statisticsResponse.lowestExpense.description}</span>
                    <span className="font-bold">{statisticsResponse.lowestExpense.amount} FCFA</span>
                  </div>
                </div>
              </ShowExpenseDetails>

            )
          }
        </div>
      </div>

      {
        statisticsResponse?.categoryExpenses && (
          <AIAnalysis
            data={statisticsResponse.categoryExpenses}
          />
        )
      }
    </main>
  )
}

export default page