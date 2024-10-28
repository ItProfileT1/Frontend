import mainStyles from './ProfileMainPage.module.css';
import skillStyles from './ProfileSkillPage.module.css';

const stylesMap = {
    'main-page': mainStyles,
    'skill-page': skillStyles,

};

const Profile = ({user_data, display_page}) => {
    const styles = stylesMap[display_page];

    const [name, surname, job, hard_rank, soft_rank, photo] = user_data;

    const handleSkillPageClick = () => {

    }

    return (
        <div className={styles.userBlock}>
            <div>
                <div className={styles.userImageBlock}>
                    <img className={styles.userBlockLogo} src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt=""/>
                    <img className={styles.userPhoto} src={photo || `${process.env.PUBLIC_URL}/assets/alt-photo.jpg`} alt=""/>
                </div>
                <div className={styles.userBlockInfo}>
                    <div><span>{name}</span></div>
                    <div><span>{surname}</span></div>
                    <div>{job}</div>
                </div>
                <div className={styles.userBlockRank}>
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
            <div className={styles.profileButtonWrapper}>
                <button className="blue-button" onClick={handleSkillPageClick}>На главную</button>
            </div>}
        </div>
    )
}

export default Profile;
