// import './SkillElement.css';
import './MainPage.css';
import Profile from "../profile/Profile";
import MainPageMenu from "./MainPageMenu";

const MainPage = ({ user_data, isAdmin }) => {

    return (
        <div className="main-page">
            <Profile user_data={user_data} display_page={"main-page"} />
            <MainPageMenu isAdmin={isAdmin} />
        </div>
    );
};

export default MainPage;
