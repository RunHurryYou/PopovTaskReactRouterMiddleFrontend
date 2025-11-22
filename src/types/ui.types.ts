export interface ITextInputProps {
    name: string;
    label: string;
    placeholder: string;
    description: string;
    error: string;
    variant: "filled" | "unstyled" | "default";
    radius: "xs" | "sm" | "md" | "lg" | "xl";
    size: "xs" | "sm" | "md" | "lg" | "xl";
    disabled: boolean;
    withAsterisk: boolean;
    icon: React.ReactElement;
}