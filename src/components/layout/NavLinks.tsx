export const NavLinks = [
    {
        label: "Dashboard",
        authRequired: false,
        href: "/",
    },
    {
        label: "To-do",
        authRequired: true,
        href: "/to-do",
    },
]

export const NonAuthenticatedLinks = [
    {
        label: "SignUp",
        authRequired: false,
        href: "/register"
    },
    {
        label: "Login",
        authRequired: false,
        href: "/login"
    },
]