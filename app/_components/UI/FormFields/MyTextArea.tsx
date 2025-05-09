import { ITextAreaProps } from "@/app/_lib/definations/form-definations";
import { GetIcon } from "../Icons/GetIcon";

export default function MyTextArea(props: ITextAreaProps) {
    function onChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (props.inputAttr.onChange) {
            props.inputAttr.onChange(event.target.value);
        }
    }

    return (
        <div className="inputWrapper">
            <div className="flex size-full items-center">
                <label htmlFor={props.inputAttr.name} className={props.hideIcon ? "hidden" : "iconWrapper self-start top-4"}>
                    <GetIcon iconName={props.iconName} width="18" height="18" />
                </label>
                <textarea rows={props.rows || 3} className={props.hideIcon ? "ps-3" : ""} {...props.inputAttr} onChange={onChangeHandler} title={props.inputAttr.title || props.label} placeholder={props.label}></textarea>
                <label className={props.hideIcon ? "label left-2" : "label"} htmlFor={props.inputAttr.name}>
                    {props.label}
                </label>
            </div>
            {props.inputAttr.error && <p className="input-error">{props.inputAttr.error}</p>}
        </div>
    );
}
