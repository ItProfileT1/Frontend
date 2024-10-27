import './Profile.css';
import UserBlock from './UserBlock'

const Profile = ({user_data, display_page}) => {
    return (
        <div style={{display:'flex'}}>
            <UserBlock user_data={user_data} display_page={display_page}/>
        </div>
    )
}

export default Profile;
