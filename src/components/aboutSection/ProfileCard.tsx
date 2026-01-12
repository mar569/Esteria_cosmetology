import React from 'react';
import me from '../../assets/me.png';
import { socialLinks } from '../../utils/socialLinks';


const ProfileCard: React.FC = () => {
    const handleBookClick = () => {
        window.open(socialLinks.vk, '_blank');
    };

    return (
        <div
            className="pc-card-wrapper flex justify-center items-center"
        >
            <section className="pc-card">
                <div className="pc-inside">
                    <div className="pc-content pc-avatar-content">
                        <img
                            className="avatar"
                            src={me}
                            alt="Марианна Владимировна"
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                        <div className="pc-user-info">
                            <div className="pc-user-details">
                                <div className="pc-mini-avatar">
                                    <img
                                        src={me}
                                        alt="Марианна Владимировна mini avatar"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="pc-user-text">
                                    <div className="pc-handle">@marianna_cosmo</div>
                                    <div className="pc-status">Индивидуальный подход</div>
                                </div>
                            </div>
                            <button
                                className="pc-contact-btn"
                                style={{ pointerEvents: 'auto' }}
                                type="button"
                                aria-label="Записаться к Марианне Владимировне"
                                onClick={handleBookClick}
                            >
                                Записаться
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfileCard;
