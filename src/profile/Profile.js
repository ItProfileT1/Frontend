import mainStyles from "./ProfileMainPage.module.css";
import skillStyles from "./ProfileSkillPage.module.css";
import ratingStyles from "./ProfileRatingPage.module.css";

const stylesMap = {
    "main-page": mainStyles,
    "skill-page": skillStyles,
    "rating-page": ratingStyles,
};

const Profile = ({ userData, display_page, onPageChange }) => {
    if (!userData) {
        return <></>;
    }

    const styles = stylesMap[display_page];

    return (
        <div className={styles.userBlock}>
            <div>
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
                            `${process.env.PUBLIC_URL}/assets/alt-photo.jpg`
                        }
                        alt=""
                    />
                </div>
                <div className={styles.userBlockInfo}>
                    <div>
                        <span>{userData.name}</span>
                    </div>
                    <div>
                        <span>{userData.surname}</span>
                    </div>
                    <div>{userData.position}</div>
                </div>

                {userData.skill && (
                    <div>
                        <div className={styles.userBlockHeadline}><span>Оцениваемый навык</span></div>
                        <div>{userData.skill}</div>
                    </div>
                )}

                {userData.skillDescription && (
                    <div>
                        <div className={styles.userBlockHeadline} style={{marginTop: "20px"}}><span>Описание навыка</span></div>
                        <textarea
                            readOnly
                            value={userData.skillDescription}
                        ></textarea>
                    </div>
                )}
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
