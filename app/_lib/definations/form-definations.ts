export interface IInputProps {
    inputAttr: {
        name: string;
        type: string;
        title?: string;
        id?: string;
        required?: boolean;
        min?: string;
        max?: string;
        value: string;
        error?: string | undefined;
        disabled?: boolean;
        onChange?: (value: string) => void;
    };
    label: string;
    iconName: string;
    hideIcon?: boolean;
}

export interface ITextAreaProps extends IInputProps {
    rows?: number;
}

export interface IFormState {
    errors?: Record<string, string>;
    message?: string;
    pending: boolean;
    success: boolean;
}
