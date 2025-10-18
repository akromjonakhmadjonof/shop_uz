import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';

function MultiRouter(route) {
	return (
		<>
			<Route
				exact
				path={route.path}
				render={(props) => {
					route.onEnter && route.onEnter(props, route);
					return (
						<route.layout {...route.params} title={route.title}>
							<route.component {...props} />
						</route.layout>
					);
				}}
			/>
			{route.routes.map((route, index) => (
				<MultiRouter
					key={index}
					{...route}
				/>
			))}
		</>
	);
}

MultiRouter.propTypes = {
	path:PropTypes.string.isRequired,
	component:PropTypes.any.isRequired,
	layout:PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	routes:PropTypes.array,
};

MultiRouter.defaultProps = {
	routes:[],
};

export default MultiRouter;
