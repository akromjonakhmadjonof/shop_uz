import DocumentTitle from 'react-document-title'

const Document = ({title, children}) => {
	return (
		<DocumentTitle title={title}>
			{children}
		</DocumentTitle>
	)
}

export default Document
