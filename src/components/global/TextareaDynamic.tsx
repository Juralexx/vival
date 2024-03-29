import React from 'react'

export const addClass = (state: boolean, classe: string) => {
    if (state) return classe
    else return 'un' + classe
}

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isError?: boolean;
    isSuccess?: boolean;
    onChange: (...args: any) => void;
}

export const TextareaDynamic = (props: Props) => {
    const { style, className, icon, endIcon, isError = false, isSuccess = false, onChange = () => { }, ...others } = props;

    const textareaRef: React.MutableRefObject<HTMLTextAreaElement | null> = React.useRef(null);

    const expandHeight = (event: any) => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            if (event.target.value.length === 0) {
                textarea.style.removeProperty("height");
            }
        }
    }

    return (
        <div className={`${className ? "av-textarea-dynamic " + className : "av-textarea-dynamic"}`}>
            <textarea
                {...others}
                ref={textareaRef}
                onClick={(event: any) => expandHeight(event)}
                onChange={event => {
                    onChange(event)
                    expandHeight(event)
                }}
            />
            <label className={`${addClass(isError, 'error')} ${addClass(isSuccess, 'success')}`}>
                {props.name}
            </label>
        </div>
    )
}

export default TextareaDynamic;