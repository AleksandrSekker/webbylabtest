export interface ILoginInputs {
    email: string;
    password: string;
}
export interface IRegisterInputs {
    email: string;
    password: string;
}
export interface IAuthFormProps {
    type: "login" | "register";
}
