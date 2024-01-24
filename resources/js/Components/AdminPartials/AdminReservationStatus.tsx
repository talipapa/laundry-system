import { availableStatus } from "@/Helpers/OrderStatus"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select"
import React from "react"

const AdminReservationStatus = ({row, column, getValue, table}: any) => {
    const [foreGroundColor, setForegroundColor] = React.useState(availableStatus[getValue() as keyof typeof availableStatus].foreground || '')
    const onChange = (e: any) => {
        setForegroundColor(availableStatus[e as keyof typeof availableStatus].foreground)
        table.options.meta?.updateStatus(row.index, row.original.id, column.id, e)
    }
    return <div className='flex flex-col items-start'>
    <Select onValueChange={onChange}>
        <SelectTrigger className={`w-32 ${foreGroundColor} bg-[#2b2a2a] dark:bg-[#181717]`}>
          <SelectValue placeholder={(getValue() as string).toString()}/>
        </SelectTrigger>
      <SelectContent>
        <SelectItem value="waiting" className={availableStatus.waiting.foreground}>waiting</SelectItem>
        <SelectItem value="washing" className={availableStatus.washing.foreground}>washing</SelectItem>
        <SelectItem value="pickup" className={availableStatus.pickup.foreground}>pickup</SelectItem>
        <SelectItem value="complete" className={availableStatus.complete.foreground}>complete</SelectItem>
      </SelectContent>
    </Select>
  </div>
}

export default AdminReservationStatus