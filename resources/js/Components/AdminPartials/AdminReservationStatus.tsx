import { availableStatus } from "@/Helpers/OrderStatus"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select"
import React from "react"

const AdminReservationStatus = ({row, column, getValue, table}: any) => {

  const {name, foreground} = getValue()

    const dataColorPicker = (propertyName: any) => {
      switch (propertyName) {
        case availableStatus.waiting.name:
          return availableStatus.waiting.foreground
        case availableStatus.washing.name:
          return availableStatus.washing.foreground
        case availableStatus.pickup.name:
          return availableStatus.pickup.foreground
        case availableStatus.complete.name:
          return availableStatus.complete.foreground
        default:
          return ''
      }
    }


    
    const onChange = (e: any) => {
        table.options.meta?.updateStatus(row.index, row.original.id, column.id, e, dataColorPicker(e),)
    }

    return <div className='flex flex-col items-start'>
    <Select onValueChange={onChange}>
        <SelectTrigger className={`w-full ${foreground ? foreground : 'text-black dark:text-white'} bg-[#2b2a2a] dark:bg-[#181717]`}>
          <SelectValue placeholder={name}/>
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