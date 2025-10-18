const useLoading = (loading, text, loadingText = 'Загрузка . . .') => {
	return loading ? loadingText : text;
};

export default useLoading;
