import MessageContainer from "../components/MessageContainer";
import ProfileEdit from "../components/ProfileEdit";
import Sidebar from "../components/Sidebar";
import { useConversationContext } from "../context/conversationContext";

const Home = () => {
	const { isProfilePage } = useConversationContext();

	return (
		<div className='flex w-full overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar setProfilePage />
			{isProfilePage ? <ProfileEdit /> : <MessageContainer /> }
		</div>
	);s
};
export default Home;