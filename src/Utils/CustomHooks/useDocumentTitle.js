import { useEffect } from "react";

export const useDocumentTitle = () => {
    useEffect(() => {
        document.title = "Easy Notes"
    },[])
}