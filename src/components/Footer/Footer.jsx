import instIcon from '../../assets/image/ic-instagram.svg';
import whatsappIcon from '../../assets/image/ic-whatsapp.svg';

import s from './Footer.module.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className={s.footerMain}>
                    <div className="section_top">
                        <h2 className="section_top_title">Contact</h2>
                    </div>

                    <div className={s.contactInfo}>
                        <div className={s.left}>
                            <div className={s.contactInfoItem}>
                                <h4 className={s.contactInfoItemTit}>Phone</h4>
                                <div className={s.contactInfoItemData}>
                                    <a href="tel:+499999999999">+49 999 999 99 99</a>
                                </div>
                            </div>
                            <div className={s.contactInfoItem}>
                                <h4 className={s.contactInfoItemTit}>Socials</h4>
                                <div className={s.contactInfoItemData}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/startainstitute">
                                        <img src={instIcon} alt="Instagram Icon"/>
                                    </a>
                                    <a target="_blank" rel="noopener noreferrer" href="https://www.whatsapp.com/">
                                        <img src={whatsappIcon} alt="Whatsapp Icon"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={s.right}>
                            <div className={s.contactInfoItem}>
                                <h4 className={s.contactInfoItemTit}>Address</h4>
                                <div className={s.contactInfoItemData}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/ip62oEdpqGt347hX9">Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland</a>
                                </div>
                            </div>

                            <div className={s.contactInfoItem}>
                                <h4 className={s.contactInfoItemTit}>Working Hours</h4>
                                <div className={s.contactInfoItemData}>
                                    <p>24 hours a day</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <iframe
                        title="Google Maps"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1717.1462452940207!2d13.373864166993902!3d52.50789150669348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1sru!2sua!4v1705437472668!5m2!1sru!2sua"
                        width="100%"
                        height="350"
                        style={{border:0, borderRadius: 12, outline: 'none'}}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </footer>
    );
}

export default Footer;