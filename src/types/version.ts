export enum typeEnum {
    NEXT = 'NEXT',
    PERVIOUS = 'PERVIOUS',
}  

export interface actionType {
    type: typeEnum;
}

export interface versionType {
    id:string;
    name:string;
}

export interface versionHookType {
    selectedVersion:versionType,
    dispatch:React.Dispatch<actionType>
}