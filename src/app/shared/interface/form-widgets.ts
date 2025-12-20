export interface TouchSpin {
    id: number;
    default_value: number;
    outlined_value: number;
    rounded_value: number;
    color: string;
}

export interface CustomSwitch {
    class: string;
    value: boolean;
}

export interface CommonSwitch {
    title: string;
    div_class?: string;
    sub_description: string;
    item: CommonSwitchItem[];
}

export interface CommonSwitchItem {
    color_class: string;
    text: string;
    value: boolean;
}

export interface DisabledOutlineSwitch {
    class: string;
    value: boolean;
}

export interface SwitchSizing {
    class: string;
    text: string;
    value: boolean;
    disable: boolean;
    div_class?: string;
}

export interface SwitchIcon {
    class: string;
    text: string;
    value: boolean;
    disable: boolean;
}

export interface State {
     id: number; 
     name: string 
    };
