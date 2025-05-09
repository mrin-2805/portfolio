import { GetIcon } from "./Icons/GetIcon";

interface Props {
    text: string;
    revColors?: boolean;
}

export default function TitleBlock({ text, revColors = false }: Props) {
    return (
        <div className={`${revColors ? "bg-background text-foreground" : "bg-foreground text-background"} mb-2 flex w-fit items-center gap-1 rounded p-2`}>
            <GetIcon iconName="Circle Fill" width="10" height="10" />
            <p>{text}</p>
        </div>
    );
}
