import React, { useState } from 'react'
// project components
import { LoadingOverlay } from '../../../components/SuspenseLoader'
import ItemForm from "./ItemForm"
import DeleteConfirmDialog from "./ItemDeleteConfirm"
// hooks
import { useQuery } from "../../../custom-hooks"
// types
import { InventoryItem } from '../../../pages/inventory'

const ItemTable = React.lazy(() => import("./ItemTable"))

export default function ItemTab() {
    const { data, loading, refetchData } = useQuery<InventoryItem[]>("/ingredients")
    const [form, setForm] = useState<boolean>(false)
    const [edit, setEdit] = useState<InventoryItem | null>(null)
    const [remove, setDelete] = useState<number | null>(null)

    const toggleForm = () => {
        setForm(!form)
        setEdit(null)
    }
    const reload = () => refetchData()

    const handleEditItem = (item: InventoryItem) => {
        setEdit(item)
        setForm(true)
    }

    const handleDeleteItem = (id: number) => setDelete(id)

    return (
        <>
            {data && 
                <ItemTable 
                    itemList={data}
                    onAddClick={toggleForm}
                    onEditClick={handleEditItem}
                    onDeleteClick={handleDeleteItem}
                />
            }

            <LoadingOverlay open={loading} />

            <ItemForm 
                open={form}
                edit={edit}
                handleClose={toggleForm}
                onReload={reload}
            />

            <DeleteConfirmDialog 
                item={remove}
                onClose={() => setDelete(null)}
                onReload={reload}
            />
        </>
    )
}