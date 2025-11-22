interface ISignInFormValues {
    email: string;
    password: string;
}

interface ISignUpFormValues extends ISignInFormValues {
    fullname: string;
    sex: string;
}

export type FormsReturnType = Partial<ISignInFormValues> | Partial<ISignUpFormValues>

export type IOnSubmtProp = {
    onSubmit: (data: FormsReturnType, type: string) => void
}