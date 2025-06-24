import { useEffect } from 'react'

export function DocumentTitle(title: string) {
    useEffect(() => {
        document.title = (title ? `${title} | ` : '') + 'Work Portal'
    }, [title])
}
