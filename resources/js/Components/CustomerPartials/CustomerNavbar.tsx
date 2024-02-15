import { Badge } from "@/shadcn/ui/badge"
import { ModeToggle } from "../mode-toggle"

const CustomerNavbar = ({headerText, navBarHeight, auth}: any) => {
  return (
    <div className={`w-full h-[75px] bg-[#ffffff] dark:bg-[#111111] border-b-2 sticky top-0 
    border-slate-100 dark:border-slate-600 dark:dark flex items-center px-10 z-[50]`}>
        <div className='flex flex-row justify-between items-end w-full'>
          <span className='text-lg font-semibold'>{headerText}</span>
          <div className="flex flex-row space-x-16 items-end">
            <div className="flex flex-col items-start justify-start">
              {auth.user.role === 'owner' ? 
                <Badge className='bg-[#68007a] text-sm py-0 scale-[0.82] select-none'>
                  {auth.user.role.toUpperCase()}
                </Badge>
              : 
                <Badge className='bg-[#001e45] dark:bg-[#496e9e] text-sm py-0 scale-[0.82] select-none'>
                  {auth.user.role.toUpperCase()}
                </Badge>
              }
                <span className="px-2">
                {`${auth.user.first_name} ${auth.user.last_name}`}
                </span>
            </div>
            
            <ModeToggle/>
          </div>
        </div>   
    </div>
  )
}

export default CustomerNavbar