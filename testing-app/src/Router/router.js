import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	...rest
}) => (
		<Route
			{...rest}
			render={props => {

				if (isAuthProtected && !localStorage.getItem("authUser")) {
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}
				if(props.match.path =='/sales_approval'){
					if(rest.user.emp_role !== 1){
						return (
							<Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
						)
					}
				}

				return (
						<Component {...props} />
				);
			}}
		/>
	);

	const mapStateToProps =(state)=>{
		return {
		  isLogin:state.isLogin,
		  user:state.user
		}
	  }

export default AppRoute;

