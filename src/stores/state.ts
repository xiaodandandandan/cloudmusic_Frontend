
type AnyObject = {
    [key: string]: any;
};
export interface storeState{
    isLogin: boolean;
    searchKeyword:string;
    searchHistory:string;
    userProfile: AnyObject;
}

const state : storeState = {
    isLogin: localStorage['isLogin'] || false,
    searchKeyword: '',
    searchHistory: '',
    userProfile : JSON.parse(localStorage['userProfile']) || {}
}

export default state