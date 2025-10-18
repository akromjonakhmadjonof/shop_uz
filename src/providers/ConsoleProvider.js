const ConsoleProvider = (props) => {

	console.error = function () {
	};

	const {children} = props;
	return (
		<>
			{children}
		</>
	);
};

export default ConsoleProvider;
