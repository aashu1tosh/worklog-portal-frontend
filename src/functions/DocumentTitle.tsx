import { useEffect } from 'react'

export function DocumentTitle(title: string) {
    useEffect(() => {
        document.title = (title ? `${title} | ` : '') + 'HRMS - Human Resource Management System'
    }, [title])
}
