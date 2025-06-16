"use client"

import * as React from "react"
import { Pie, PieChart, Label } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from   "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { CardDescription } from "@/components/ui/card"

const rawData = [
    { type: "Lended", stock: 50, fill: "#fe4c00" },
    { type: "Available", stock: 20, fill: "#00e597" },
    { type: "OverDue", stock: 10, fill: "#0092f6" },

]

const chartConfig = {
    Lended: {
        label: "Lended",
        color: "#fe4c00",
    },
    Available: {
        label: "Available",
        color: "#00e597",
    },
    OverDue: {
        label: "OverDue",
        color: "#0092f6",
    },
}

export function ChartPieDonutText() {
    const totalVisitors = rawData.reduce((acc, curr) => acc + curr.stock, 0)

    const chartData = rawData.map((item) => ({
        ...item,
        percent: ((item.stock / totalVisitors) * 100).toFixed(1), 
    }))

    return (
        <Card data-swapy-item="b" className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Book Availability</CardTitle>
                <CardDescription>Percentage of book availability</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                />
                            }
                        />
                        <Pie
                            data={chartData}
                            dataKey="stock"
                            nameKey="type"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    100%
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                        <ChartLegend
                            content={() => (
                                <div className="flex justify-center items-center gap-3">
                                    {chartData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <span
                                                className="block h-3 w-3 rounded-full"
                                                style={{ backgroundColor: item.fill }}
                                            />
                                            <div className="flex items-center gap-1 flex-col">
                                            <span className="" >{item.type} </span>
                                            <span className="font-semibold" >{item.percent}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />

                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
