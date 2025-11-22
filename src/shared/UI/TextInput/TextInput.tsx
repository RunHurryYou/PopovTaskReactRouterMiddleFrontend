import type { ITextInputProps } from "../../types/ui.types";
import styles from "./TextInput.module.scss";

const SIZE_CLASSES = {
  xs: "block-xs",
  sm: "block-sm", 
  md: "block-md",
  lg: "block-lg",
  xl: "block-xl",
};

const RADIUS_CLASSES = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md", 
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const VARIANT_CLASSES = {
  filled: "input-container-filled",
  unstyled: "input-container-unstyled",
  default: "input-container",
};

export const TextInput = (props: Partial<ITextInputProps>) => {
    const sizeClassname = props.size ? SIZE_CLASSES[props.size] : "";
    const radiusClassname = props.radius ? RADIUS_CLASSES[props.radius] : "rounded-md";
    const variantClassname = props.variant ? VARIANT_CLASSES[props.variant] : "input-container";

    return (
        <div className={styles["input-wrapper"]}>
            {props.label &&
                <span className={styles["label"]}>
                    {props.label}{props.withAsterisk ? <><span className={styles["text-red-500"]}> *</span></> : ""}
                </span>
            }
            { props.description && <span>{props.description}</span>}
            <div className={`${styles[variantClassname]} ${styles[sizeClassname]} ${styles[radiusClassname]} ${props.error && props.variant !== "unstyled" ? styles["border-box-red-500"] : ""}`}>
                {props.icon && <span className={styles["input-icon"]}>{props.icon}</span>}
                <input type="text" name={props.name} className={`${styles["input"]} ${props.error && styles["border-input-red-500"]}`} disabled={props.disabled} placeholder={props.placeholder ?? ""} />
            </div>
            {props.error && <span className={styles["text-red-500"]}>{props.error}</span>}
        </div>
    );
};
