import { useToast } from "@/shadcn/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog"
import { Label } from '@/shadcn/ui/label'
import { Input } from '@/shadcn/ui/input'


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu'
import { Button } from '@/shadcn/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import React from "react"
import { router } from "@inertiajs/react"

const AdminCustomerActions = ({row}: any) => {
    const payment = row.original
    const [onOpen, setOpen] = React.useState(false) 
    const [updateDialogIsOpen, setUpdateDialogIsOpen] = React.useState(false)
    const [changePasswordDialogIsOpen, setChangePasswordDialogIsOpen] = React.useState(false)
    const {toast} = useToast()

    const clipBoardNotif = (clipboardPayload: string) => {
      navigator.clipboard.writeText(clipboardPayload)
      toast({title: 'Copied to clipboard', description: 'User ID copied to clipboard', variant: 'success'})
    }

    const [disabledButton, setDisabledButton] = React.useState(false)

    const [user, setUser] = React.useState<any>({
      id: row.original.id,
      first_name: row.original.first_name,
      last_name: row.original.last_name,
      email: row.original.email
    })

    const updateUser = (e: any) => {
      e.preventDefault()
      const payload = {
        id: row.original.id,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value
      }
      router.put(route('admin.customer.update'), payload, {
        onSuccess: () => {
          toast({title: 'User updated', description: 'User info has been updated', variant: 'success'})
          setUpdateDialogIsOpen(false)
        },
        onError: () => {
          toast({title: 'Error', description: 'Something went wrong', variant: 'destructive'})
        },
        onStart: () => {
          setDisabledButton(true)
        },
        onFinish: () => {
          setDisabledButton(false)
        }
      
      })
    }
    const changePassword = (e: any) => {
      e.preventDefault()
      const payload = {
        id: row.original.id,
        password: e.target.password.value,
      }
      router.put(route('admin.customer.password'), payload, {
        onSuccess: () => {
          toast({title: 'User updated', description: 'User password has been successfully changed', variant: 'success'})
          setChangePasswordDialogIsOpen(false)
        },
        onError: (e) => {
          toast({title: 'Error', description: e.password, variant: 'destructive'})
        },
        onStart: () => {
          setDisabledButton(true)
        },
        onFinish: () => {
          setDisabledButton(false)
        }
      })
    }
    const destroyUser = (e: any) => {
      e.preventDefault()
      console.log(row.original.id)
      router.delete(route('admin.customer.destroy', `${row.original.id}`), {
        onSuccess: () => {
          toast({title: 'User deleted', description: 'User password has been successfully deleted', variant: 'success'})
          setOpen(false)
        },
        onError: (e) => {
          console.log(e)
          toast({title: 'Error', description: e.toString(), variant: 'destructive'})
        },
        onStart: () => {
          setDisabledButton(true)
        },
        onFinish: () => {
          setDisabledButton(false)
        }
      })
    }
    return (
      <>
        <AlertDialog open={onOpen} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user account
                and remove from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className='dark:bg-slate-300 dark:text-black'>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-red-900 dark:hover:bg-red-700' onClick={destroyUser} disabled={disabledButton}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Update user info dialog */}
        <Dialog open={updateDialogIsOpen} onOpenChange={setUpdateDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={updateUser}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription >
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" value={user.email} onChange={(e) => setUser((data: any) => ({...data, email: e.target.value}))} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="first_name" className="text-right">
                  First name
                </Label>
                <Input id="first_name" value={user.first_name} onChange={(e) => setUser((data: any) => ({...data, first_name: e.target.value}))} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="last_name" className="text-right">
                  Last name
                </Label>
                <Input id="last_name" value={user.last_name} onChange={(e) => setUser((data: any) => ({...data, last_name: e.target.value}))} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={disabledButton}>Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
        </Dialog>

        {/* Change password dialog */}
        <Dialog open={changePasswordDialogIsOpen} onOpenChange={setChangePasswordDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={changePassword}>
            <DialogHeader>
              <DialogTitle>Password change</DialogTitle>
              <DialogDescription >
                Change the user password
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-rows-2 items-center">
                <Label htmlFor="password" className="text-left col-span-3">
                  Password
                </Label>
                <Input id="password" name='password' className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={disabledButton}>Save password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
        </Dialog>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className='text-slate-800 dark:text-slate-200'
              onClick={() => clipBoardNotif(payment.id.toString())}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-blue-400' onClick={() => setUpdateDialogIsOpen(true)}>Update info</DropdownMenuItem>
            <DropdownMenuItem className='text-blue-400' onClick={() => setChangePasswordDialogIsOpen(true)}>Change password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-400' onClick={() => setOpen(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
}

export default AdminCustomerActions