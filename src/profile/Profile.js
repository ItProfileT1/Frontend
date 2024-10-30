import mainStyles from "./ProfileMainPage.module.css";
import skillStyles from "./ProfileSkillPage.module.css";
import ratingStyles from "./ProfileRatingPage.module.css";

const stylesMap = {
    "main-page": mainStyles,
    "skill-page": skillStyles,
    "rating-page": ratingStyles,
};

const Profile = ({ user_data, display_page }) => {
    if (!user_data) {
        return <></>;
    }

    const styles = stylesMap[display_page];

    const handleSkillPageClick = () => {};

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
                            user_data.photoPath ||
                            `${process.env.PUBLIC_URL}/assets/alt-photo.jpg`
                        }
                        alt=""
                    />
                </div>
                <div className={styles.userBlockInfo}>
                    <div>
                        <span>{user_data.name}</span>
                    </div>
                    <div>
                        <span>{user_data.surname}</span>
                    </div>
                    <div>{user_data.position}</div>
                </div>

                {user_data.hardRank !== undefined &&
                    user_data.softRank !== undefined && (
                        <div className={styles.userBlockRank}>
                            <div className="block-with-line">
                                <div>Hard Skills</div>
                                <div className="line"></div>
                                <div>
                                    Ранг <span>{user_data.hardRank}</span>
                                </div>
                            </div>
                            <div className="block-with-line">
                                <div>Soft Skills</div>
                                <div className="line"></div>
                                <div>
                                    Ранг <span>{user_data.softRank}</span>
                                </div>
                            </div>
                        </div>
                    )}

                {user_data.skill && (
                    <div>
                        <div className={styles.userBlockHeadline}><span>Оцениваемый навык</span></div>
                        <div>{user_data.skill}</div>
                    </div>
                )}

                {user_data.skillDescription && (
                    <div>
                        <div className={styles.userBlockHeadline} style={{marginTop: "20px"}}><span>Описание навыка</span></div>
                        <textarea
                            readOnly
                            value={user_data.skillDescription}
                        ></textarea>
                    </div>
                )}
            </div>

            {display_page === "skill-page" && (
                <div className={styles.profileButtonWrapper}>
                    <button
                        className="blue-button"
                        onClick={handleSkillPageClick}
                    >
                        На главную
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
