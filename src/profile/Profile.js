import mainStyles from "./ProfileMainPage.module.css";
import skillStyles from "./ProfileSkillPage.module.css";
import ratingStyles from "./ProfileRatingPage.module.css";

const stylesMap = {
    "main-page": mainStyles,
    "skill-page": skillStyles,
    "rating-page": ratingStyles,
};

const Profile = ({ userData, display_page, onPageChange }) => {
    if (!userData) return null;

    const styles = stylesMap[display_page];

    const renderUserInfo = () => (
        <div className={styles.userBlockInfo}>
            <div>
                <span>{userData.name}</span>
            </div>
            <div>
                <span>{userData.surname}</span>
            </div>
            <div>{userData.positionResponse.name}</div>
        </div>
    );

    const renderUserImages = () => (
        <div className={styles.userImageBlock}>
            <img
                className={styles.userBlockLogo}
                src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                alt=""
            />
            <img
                className={styles.userPhoto}
                src={
                    userData.photoPath ||
                    `${process.env.PUBLIC_URL}/assets/alt-photo1.jpg`
                }
                alt=""
            />
        </div>
    );

    const renderSkillDetails = () =>
        userData.skill && (
            <div>
                <div className={styles.userBlockHeadline}>
                    <span>Оцениваемый навык</span>
                </div>
                <div>{userData.skill}</div>
            </div>
        );

    const renderSkillDescription = () =>
        userData.skillDescription && (
            <div style={{ marginTop: "20px" }}>
                <div className={styles.userBlockHeadline}>
                    <span>Описание навыка</span>
                </div>
                <textarea readOnly value={userData.skillDescription}></textarea>
            </div>
        );

    return (
        <div className={styles.userBlock}>
            <div>
                {renderUserImages()}
                {renderUserInfo()}
                {renderSkillDetails()}
                {renderSkillDescription()}
            </div>

            {display_page === "skill-page" && (
                <div className={styles.profileButtonWrapper}>
                    <button
                        className="blue-button"
                        onClick={() => onPageChange("main")}
                    >
                        На главную
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
