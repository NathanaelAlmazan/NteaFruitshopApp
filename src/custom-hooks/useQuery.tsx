import React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = "https://ntea.herokuapp.com/api"

export default function useQuery<R>(url: string) {
    const navigate = useNavigate();
    const [data, setData] = React.useState<R | null>(null)
    const [error, setError] = React.useState<AxiosError | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [refetch, setRefetch] = React.useState<number>(0)

    const refetchData = () => setRefetch(refetch + 1)

    React.useEffect(() => {
        setLoading(true)

        axios.get(baseURL + url)
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((err) => {
                const error = err as AxiosError

                if (error.code === "ERR_NETWORK") navigate("/error/offline")
                else setError(error)
            });
        
    }, [url, refetch])

    return { data, error, loading, refetchData }
}