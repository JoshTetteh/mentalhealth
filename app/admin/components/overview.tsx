"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Mon",
    total: 42,
  },
  {
    name: "Tue",
    total: 38,
  },
  {
    name: "Wed",
    total: 45,
  },
  {
    name: "Thu",
    total: 39,
  },
  {
    name: "Fri",
    total: 48,
  },
  {
    name: "Sat",
    total: 25,
  },
  {
    name: "Sun",
    total: 15,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          cursor={{ fill: "rgba(0, 128, 128, 0.1)" }}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
          }}
          formatter={(value) => [`${value} appointments`, "Total"]}
          labelFormatter={(label) => `${label}`}
        />
        <Bar dataKey="total" fill="#0d9488" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
