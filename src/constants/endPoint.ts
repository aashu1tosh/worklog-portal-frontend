export const endPoint = {
    // AUTH
    auth: {
        login: '/auth/public/login',
        logout: '/auth/logout',
        isAuthenticated: '/auth/is-authenticated',
        refreshToken: '/auth/public/refresh-token',
    },
    // ADMIN
    admin: {
        admin: '/admin',
    },

    company: {
        company: '/company',
    },
    
    loginLog: {
        getLoginLog: '/login-log',
        logoutById: '/login-log/logout',
    }
}