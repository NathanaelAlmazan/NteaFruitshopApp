import React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface ErrorResponseData {
    timestamp: string;
    errors: string[];
    status: number;
}

export default function useMutation<R>(_url?: string, _body?: string) {
    const navigate = useNavigate();
    const [data, setData] = React.useState<R | null>(null)
    const [error, setError] = React.useState<ErrorResponseData | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
       if (_url && _body) {
            axios.post("http://localhost:8080/api" + _url, _body, { headers: { 'Accept': 'application/json' } })
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

    }, [_url, _body])

    const insert = (url: string, body: string) => {
        setLoading(true)

        axios.post("http://localhost:8080/api" + url, body, { headers: { 'Content-Type': 'application/json' } })
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

    const update = (url: string, body: string) => {
        setLoading(true)

        axios.put("http://localhost:8080/api" + url, body, { headers: { 'Content-Type': 'application/json' } })
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

        axios.delete("http://localhost:8080/api" + url, { headers: { 'Content-Type': 'application/json' } })
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