import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shadcn/ui/select"
import React from "react"
  


const SelectionRole = ({row, column, getValue, table}: any) => {

    const onChange = (e: any) => {
        table.options.meta?.updateRole(row.index, row.original.id, column.id, e)
    }

    return <div className='flex flex-col items-start'>
        <Select onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={getValue()}/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="staff">staff</SelectItem>
            <SelectItem value="customer">customer</SelectItem>
        </SelectContent>
        </Select>
    </div>
}

export default SelectionRole