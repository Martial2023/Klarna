'use client'

import { CategoryExpensesCountProps } from '@/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  data: CategoryExpensesCountProps[]
}
const ChartCategoryExpensesCount = ({ data }: Props) => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '60vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 15,
      }}
    >
      <CartesianGrid strokeDasharray="0 3" />
      <XAxis dataKey="category" />
      <Tooltip />
      <Legend />
      <Bar name={"Montant total"} yAxisId="totalAmount" dataKey="totalAmount" fill="#EF9FBC" radius={[10, 10, 0, 0]} />
      <Bar name={"Nombre total"} yAxisId="totalCount" dataKey="totalCount" fill="#EEAF3A" radius={[10, 10, 0, 0]} />
    </BarChart>
  )
}

export default ChartCategoryExpensesCount