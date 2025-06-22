import AuthProvider from '@/contexts/auth'
import ThemeProvider from '@/contexts/themeContext'

interface Props {
    children: React.ReactNode
}

const ContextProvider = ({ children }: Props) => (
    <ThemeProvider>
        <AuthProvider>
            {children}
        </AuthProvider>
    </ThemeProvider>
)
export default ContextProvider
