"use client"

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bell, ChevronDown, Pizza, DollarSign, ShoppingCart, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Sample data
const salesData = [
  { name: 'Domingo', sales: 4000 },
  { name: 'Segunda', sales: 3490 },
  { name: 'Terça', sales: 3000 },
  { name: 'Quarta', sales: 2000 },
  { name: 'Quinta', sales: 2780 },
  { name: 'Terça', sales: 1890 },
  { name: 'Sábado', sales: 2390 },
]

const recentOrders = [
  { id: 1, customer: 'Rodrigo', order: 'Calabresa', total: 'R$35.99', status: 'Entregue' },
  { id: 2, customer: 'Sabrina', order: 'Margherita', total: 'R$34.99', status: 'Preparando' },
  { id: 3, customer: 'Daniel', order: 'Carne seca', total: 'R$34.99', status: 'Em trânsito' },
  { id: 4, customer: 'Alice', order: 'Vegana', total: 'R$33.99', status: 'Entregue' },
  { id: 5, customer: 'Eduardo', order: 'Quatro Queijos', total: 'R$36.99', status: 'Preparando' },
]

export default function PizzeriaDashboard() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Pizzaria</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="h-5 w-5 text-yellow-500" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border-green-600 border-2">
                  <AvatarImage src="/avatar.png" alt="@pizzaadmin" />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">pizzaadmin</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@pizzaria.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer text-red-500'>
                Sair da conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-grow p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de vendas
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% do último mês
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendas hoje
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 desde a última hora
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mais pedida</CardTitle>
              <Pizza className="h-4 w-4 text-muted-foreground text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Quatro queijos</div>
              <p className="text-xs text-muted-foreground">
                31% dos pedidos totais
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Satisfação dos clientes
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9</div>
              <p className="text-xs text-muted-foreground">
                +0.2 da última semana
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Vendas da semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "Vendas",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="var(--color-sales)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID da compra</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.order}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}