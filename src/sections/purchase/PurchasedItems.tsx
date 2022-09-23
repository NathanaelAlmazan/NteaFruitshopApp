import React from 'react'
// mui
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Autocomplete from "@mui/material/Autocomplete"
import List from "@mui/material/List"
import ItemCard from "./PurchaseItemCard"
// animation 
import { AnimatePresence, motion } from 'framer-motion'
// types
import { InventoryItem } from '../../pages/inventory'
import { PurchasedItems } from '../../pages/purchase'
// hooks
import { useQuery } from '../../custom-hooks'

export interface InventoryItemCart extends InventoryItem {
    quantity: number
}

interface PurchasedItemsProps {
    setTotalPrice: (price: number) => void
    setPurchasedItems: (items: PurchasedItems[]) => void
}

export default function PurchasedItems({ setTotalPrice, setPurchasedItems }: PurchasedItemsProps) {
    const { data } = useQuery<InventoryItem[]>("/ingredients")
    const [filterItem, setFilterItem] = React.useState<string | InventoryItem>("")
    const [selected, setSelected] = React.useState<InventoryItemCart[]>([])

    React.useEffect(() => {
        const totalPrices = selected.map(item => item.unitPrice * item.quantity)
        setTotalPrice(totalPrices.reduce((total, num) => total + num, 0))
        setPurchasedItems(selected.map(s => ({ itemId: s.itemId, quantity: s.quantity })))
    }, [selected])

    const handleSelectItem = (value: string | InventoryItem) => {
        if (typeof value !== 'string' && !selected.find(s => s.itemId === value.itemId)) setSelected([ ...selected, { ...value, quantity: 1 } ])
        setFilterItem(value)
    }

    const handleAddItem = (itemId: number) => {
        setSelected(state => state.map(s => {
            if (s.itemId === itemId) return { ...s, quantity: s.quantity + 1 }
            else return s
        }))
    }

    const handleReduceItem = (itemId: number) => {
        setSelected(state => state.map(s => {
            if (s.itemId === itemId) return { ...s, quantity: s.quantity - 1 }
            else return s
        }))
    }

    const handleRemoveItem = (itemId: number) => setSelected(state => state.filter(s => s.itemId !== itemId))
    
    return (
        <>
            <Autocomplete
                freeSolo
                disableClearable
                value={filterItem}
                onChange={(event, value) => handleSelectItem(value)}
                options={data ? data.map((option) => option) : []}
                getOptionLabel={(option) => typeof option === "string" ? option : option.itemName}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search item..."
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />

            <List>
                <AnimatePresence>
                    {selected.length === 0 && (
                        <motion.div
                            key="empty-cart"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition:{ delay: 0.5, type: "spring" } }}
                            exit={{ opacity: 0 }}  
                            layout    
                        >
                            <Stack justifyContent="center" alignItems="center">
                                <Avatar 
                                    variant="rounded" 
                                    alt="empty-cart" 
                                    src="https://res.cloudinary.com/ddpqji6uq/image/upload/v1661948271/graphql_images/empty-cart_c0zya5.png" 
                                    sx={{ width: 330, height: 280 }} 
                                />
                            </Stack>
                        </motion.div>
                    )}

                    {selected.map(item => (
                        <motion.div
                            key={item.itemId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition:{ delay: 0.3, type: "spring" } }}
                            exit={{ opacity: 0, transition:{ delay: 0.3 } }}     
                            layout         
                        >
                            <ItemCard 
                                item={item} 
                                onAdd={() => handleAddItem(item.itemId)}
                                onReduce={() => handleReduceItem(item.itemId)}
                                onRemove={() => handleRemoveItem(item.itemId)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </List>
        </>
    )
}