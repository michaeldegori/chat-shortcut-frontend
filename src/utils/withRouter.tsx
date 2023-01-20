import { useLocation, useNavigate, useParams } from 'react-router-native';

export default function withRouter(Component) {
	function ComponentWithRouterProp(props: any) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}
