export const BASE_URL = "https://plwxicqvwcxgnmzzixwy.supabase.co/";
export const SIGNUP_URL = BASE_URL + "auth/v1/signup";
export const LOGOUT_URL = BASE_URL + "auth/v1/logout";
export const LOGIN_URL = BASE_URL + "auth/v1/token?grant_type=password";
export const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsd3hpY3F2d2N4Z25tenppeHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0NTgxNzgsImV4cCI6MjAzMTAzNDE3OH0.49gwol_cjAcD9yj7yWlF4zUL9dX9DOjVEd8IeEaIzBE"
export const GET_ALL_COURSES = BASE_URL + "rest/v1/courses?select=*";
