import React from 'react'
// mui
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
// project components
import { HeaderButton } from "../../components/PageHeaders"
import AccountForm from "../../sections/accounts/AccountForm"
import AccountCard from "../../sections/accounts/AccountCard"
import AccountDeleteDialog from "../../sections/accounts/AccountDeleteDialog"
import { AnimatePresence, motion } from 'framer-motion'
// custom hooks
import { useQuery, useAppSelector } from '../../custom-hooks'

function Accounts() {
  const { data: accounts, refetchData } = useQuery<UserAccount[]>("/users")
  const { search } = useAppSelector((state) => state)
  const [open, setOpen] = React.useState<boolean>(false)
  const [filtered, setFiltered] = React.useState<UserAccount[]>([])
  const [selected, setSelected] = React.useState<UserAccount>()
  const [dialog, setDialog] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (accounts) {
      const query = search.searchQuery.toLowerCase()
      if (query.length > 0) 
        setFiltered(accounts.filter(a => query.includes(a.firstName.toLowerCase()) || query.includes(a.lastName.toLowerCase())))
      else setFiltered(accounts)
    } 
  }, [search, accounts])

  const handleOpenDrawer = () => setOpen(!open)

  const handleEdit = (account: UserAccount) => {
    setSelected(account)
    setOpen(true)
  }

  const handleReload = () => {
    refetchData()
    setSelected(null)
  }

  const handleDelete = (account: UserAccount) =>  {
    setSelected(account)
    setDialog(true)
  }

  const handleCloseDialog = () => {
    setDialog(false)
    setSelected(null)
    refetchData()
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 5 }}>
      <HeaderButton 
        title="Employees" 
        buttonText='Add Employee'
        buttonClick={handleOpenDrawer}
      />

      <Grid container spacing={2}>
          <AnimatePresence>
            {filtered.map(account => (
              <Grid key={account.userId} item xs={12} sm={6} md={4}>
                <motion.div
                    key={account.userId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition:{ delay: 0.3 } }}
                    exit={{ opacity: 0, transition:{ delay: 0.3 } }}     
                    layout         
                >
                  <AccountCard 
                    account={account} 
                    onSelect={() => handleEdit(account)} 
                    onDelete={() => handleDelete(account)}
                  />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
      </Grid>

      <AccountForm
        open={open}
        account={selected}
        edit={Boolean(selected)}
        handleClose={handleOpenDrawer}
        onReload={handleReload}
      />

      {selected && (
        <AccountDeleteDialog 
          open={dialog}
          account={selected}
          handleClose={handleCloseDialog}
        />
      )}
    </Container>
  )
}

export default Accounts

export interface UserAccount {
  userId: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  userPosition: string,
  image: string | null
}