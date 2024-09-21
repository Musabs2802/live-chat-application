import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";

const Home = () => {
	return (
		<div className='flex w-full overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;