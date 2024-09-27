export const NavLinks = [
    {
        label: "Dashboard",
        authRequired: false,
        href: "/",
    },
    {
        label: "Tasks",
        authRequired: true,
        href: "/tasks",
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