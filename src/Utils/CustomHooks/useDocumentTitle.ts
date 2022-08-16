import { useEffect } from "react";

export const useDocumentTitle = (page) => {
    useEffect(() => {
        document.title = `Easy Notes | ${page}`
    },[])
}