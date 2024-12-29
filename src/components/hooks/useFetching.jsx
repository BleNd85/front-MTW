import {useState} from "react";

export default function UseFetching(callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function fetchUrls(...args) {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (error) {
            setIsError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetchUrls, isLoading, isError];
}