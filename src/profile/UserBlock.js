import './UserBlock.css';

const UserBlock = ({user_data, display_page}) => {
    const [name, surname, job, hard_rank, soft_rank, photo] = user_data;

    const handleSkillPageClick = () => {

    }

    return (
        <div className="user-block">
            <div>
                <div className="user-image-block">
                    <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="" style={{width: 120, height: 120}}/>
                    <img className="user-photo" src={photo || `${process.env.PUBLIC_URL}/assets/alt-photo.jpg`} alt=""/>
                </div>
                <div className="user-block-info">
                    <div><span>{name}</span></div>
                    <div><span>{surname}</span></div>
                    <div>{job}</div>
                </div>
                <div className="user-block-rank">
                    <div className="block-with-line">
                        <div>Hard Skills</div>
                        <div className="line"></div>
                        <div>Ранг <span>{hard_rank}</span></div>
                    </div>
                    <div className="block-with-line">
                        <div>Soft Skills</div>
                        <div className="line"></div>
                        <div>Ранг <span>{soft_rank}</span></div>
                    </div>
                </div>
            </div>

            {display_page === 'skill-page' &&
            <div className="profile-button-wrapper">
                <button className="blue-button" onClick={handleSkillPageClick}>На главную</button>
            </div>}
        </div>
    )
}

export default UserBlock;
