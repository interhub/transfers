import ACTION_NAME from "./ACTION_NAME";


export interface setLoadActionType {
    type: typeof ACTION_NAME.SET_LOAD
    load:boolean
}

export const setLoadAction = (load: boolean= false): setLoadActionType => {
    return {
        type: ACTION_NAME.SET_LOAD,
        load
    };
};
