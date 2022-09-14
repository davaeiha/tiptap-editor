export enum typeEnum {
    NEXT = 'NEXT',
    PERVIOUS = 'PERVIOUS',
}  

export interface actionType {
    type: typeEnum;
}
export interface versionType {
    name:string;
    value:string;
}

export interface versionHookType {
    selectedVersion:versionType,
    dispatch:React.Dispatch<actionType>
}