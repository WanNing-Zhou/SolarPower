import router from "@/router";

export function logout() {
    window.location.href = '/login'
    router.push('/login')
}
