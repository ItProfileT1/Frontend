const InputBlock = ({id, label}) => {
    const handleFocus = (e) => document.getElementById(`${e.target.id}-input-block`).style.opacity = 1;
    const handleBlur = (e) => document.getElementById(`${e.target.id}-input-block`).style.opacity = 0.7;

    return (
        <div className="auth-input-block" id={`${id}-input-block`} style={{opacity:0.7}}>
            <div className="auth-input-icon"><img src={`${process.env.PUBLIC_URL}/assets/auth/${id}.svg`} alt=""/></div>
            <div className="auth-input-static">
                <div className="auth-input-text">{label}</div>
                <input placeholder="Ввод..." onFocus={handleFocus} onBlur={handleBlur} autoComplete="off" spellCheck="off" id={id}  name={id} required/>
                <img src={`${process.env.PUBLIC_URL}/assets/auth/${id}-static.svg`} alt=""/>
            </div>
        </div>
    )
}

export default InputBlock;