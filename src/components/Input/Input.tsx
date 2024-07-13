
function Input (props:any){

    return (
        <input type="text" onChange={props.onChange} value={props.valueInput} onKeyDown={props.submit}/>
    )
};

export default Input;