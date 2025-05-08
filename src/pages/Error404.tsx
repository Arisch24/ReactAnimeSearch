import { Navigate } from 'react-router-dom';

function Error404() {
	return <Navigate to="/" replace />;
}

export default Error404;
