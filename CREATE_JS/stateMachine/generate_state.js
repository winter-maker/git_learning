/**
 * 函数模板，
 * return 状态函数的函数
*/
export function stateFun(nextChar, nextState, redirectState) {
    return (char)=>{
        if(char === nextChar) return nextState;
        return redirectState(char);
    }
}
