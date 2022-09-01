import React from 'react';
import axios, { AxiosError } from 'axios';

export default function useQuery<R>(url: string) {
    const [data, setData] = React.useState<R | null>(null)
    const [error, setError] = React.useState<AxiosError | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [refetch, setRefetch] = React.useState<number>(0)

    const refetchData = () => setRefetch(refetch + 1)

    React.useEffect(() => {
        setLoading(true)

        axios.get("https://ntea.herokuapp.com/api" + url)
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data)
                } else if (error.request) {
                    setError(error.request)
                }
            });
        
    }, [url, refetch])

    return { data, error, loading, refetchData }
}