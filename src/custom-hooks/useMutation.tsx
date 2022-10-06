import React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from "./baseUrl"
import useAppSelector from "./useAppSelector"

interface ErrorResponseData {
    timestamp: string;
    errors: string[];
    status: number;
}

export default function useMutation<R>() {
    const navigate = useNavigate();
    const { auth } = useAppSelector((state) => state)
    const [data, setData] = React.useState<R | null>(null)
    const [error, setError] = React.useState<ErrorResponseData | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)

    const insert = (url: string, body: string) => {
        setLoading(true)

        axios.post(baseURL + url, body, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` } })
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                const error = err as AxiosError

                if (error.code === "ERR_NETWORK") navigate("/error/offline")
                else setError(error.response.data as ErrorResponseData)
            });
    }

    const update = (url: string, body: string) => {
        setLoading(true)

        axios.put(baseURL + url, body, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` } })
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((err) => {
                const error = err as AxiosError

                if (error.code === "ERR_NETWORK") navigate("/error/offline")
                else setError(error.response.data as ErrorResponseData)
            });
    }

    const remove = (url: string) => {
        setLoading(true)

        axios.delete(baseURL + url, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` } })
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((err) => {
                const error = err as AxiosError

                if (error.code === "ERR_NETWORK") navigate("/error/offline")
                else setError(error.response.data as ErrorResponseData)
            });
    }

    return { data, error, loading, insert, update, remove }
}