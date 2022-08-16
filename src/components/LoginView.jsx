import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import { loginValidation } from '../store/slices/user/userSlice';
import './style.css'

export const LoginView = ({ dispatch, admin }) => {
  
    const [user, setUser] = useState({});
    const { addToast } = useToasts();

    const handleInputs = ({ key, value }) => setUser(e => ({...e, [key]: value}))

    const onSubmit = (e) => {
        e.preventDefault();
        if(user.user !== admin.username || user.pass !== admin.password) {
            addToast('Wrong user. Please check.', { appearance: 'error', autoDismiss: true })
            return;
        } else {
            dispatch(loginValidation(true))
        }
    }

  return (
    <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="Username" name='user' onChange={({ target }) => handleInputs({ key: target.name, value: target.value })}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password" name='pass' onChange={({ target }) => handleInputs({ key: target.name, value: target.value })}/>
				</div>
				<button className="button login__submit" onClick={ onSubmit }>
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
  )
}
