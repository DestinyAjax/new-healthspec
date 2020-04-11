import React from 'react';
import moment from 'moment';
import styles from './Card.component.module.css';

class Card extends React.Component {

    render() {

        const { beneficiary, transaction } = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.content}>

                    <div>
                        <div className={styles.innerContainer} id="slip">
                            <div  className={'card-header'}>
                                <div className={styles.logoContainer}><img src={require('../../assets/images/logo-head.png')} /></div>
                                <div   className={'h3'}  Container}>
                                    <div className={styles.head}>Osun Health Insurance Scheme</div>
                                    <div className={styles.subHead}>
                                        <div>Ministry of Health, State of Osun</div>
                                        <div>Osun Health Insurance Scheme Slip (OHIS)</div>
                                    </div>
                                </div>
                                <div className={styles.logoContainer}><img src={require('../../assets/images/logo-head.png')} /></div>
                            </div>

                            <div className={styles.body}>
                                <div className={styles.basicInfo}>
                                    <div className={styles.trackingNumber}>
                                        <ul className={styles.cells}>
                                            <li className={styles.cell}><span className={styles.cellTitle}>Tracking ID:</span> <span>{transaction.reference_number}</span></li>
                                            <li className={styles.cell}><span className={styles.cellTitle}>Enrollee ID:</span> <span>{beneficiary.user.enrollee_id}</span></li>
                                            <li className={styles.cell}><span className={styles.cellTitle}>Issue Date:</span> <span>{moment(beneficiary.user.created_at.date).format('Do YYYY MMMM')} </span></li>
                                        </ul>
                                    </div>
                                    <div className={styles.primaryInfo}>
                                        <ul className={styles.cells}>
                                            <li className={styles.cell}><span className={styles.cellTitle}>Surname:</span> <span>{ beneficiary.user.first_name }</span></li>
                                            <li className={styles.cell}><span className={styles.cellTitle}>First Name:</span> <span>{ beneficiary.user.last_name }</span></li>
                                            <li className={styles.cell}><span className={styles.cellTitle}>Middle Name:</span> <span>{ beneficiary.user.middle_name}</span></li>
                                            <li className={[styles.cell, styles.lastCell].join(" ")}><span className={styles.cellTitle}>Gender:</span> <span>{ beneficiary.user.gender }</span></li>
                                        </ul>
                                    </div>
                                </div>


                                <div className={styles.addressImage}>
                                    <div className={styles.address}>
                                        <div className={styles.street}>
                                            <div>Address</div>
                                            <div>{ beneficiary.profile.address }</div>
                                        </div>

                                        <div className={styles.city}>
                                            <div>{ beneficiary.profile.lga }</div>
                                            <div>{ beneficiary.profile.state }</div>
                                        </div>
                                    </div>
                                    <div className={styles.imageContainer}>
                                        <img src={beneficiary.profile.picture} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.noteContainer}> OHIS
                                <span className={styles.inportant}>Note:</span> <span className={styles.inportant}>The Enrollee Identity (EID) is your identity</span>
                                The slip that has been generated for you is a temporary ID card.
                                It may be use to access care in your chosen Hospital for a limited period only.
                                Please come to the OHIS Office for your permanent ID Card
                            </div>

                            <div className={styles.companies}>
                                <div className={styles.company}>
                                    <div>
                                        <div><i className="fa fa-info-circle fa-2x" aria-hidden="true"></i></div>
                                        <div>helpdesk@ohis.osun.gov.ng</div>
                                    </div>
                                </div>
                                <div className={styles.company}>
                                    <div>
                                        <div><i className="fa fa-internet-explorer fa-2x" aria-hidden="true"></i></div>
                                        <div>helpdesk@ohis.osun.gov.ng</div>
                                    </div>
                                </div>
                                <div className={styles.company}>
                                    <div>
                                        <div><i className="fa fa-phone-square fa-2x" aria-hidden="true"></i></div>
                                        <div>08114247689, 09023238996</div>
                                        <div>08035610406</div>
                                    </div>
                                </div>
                                <div className={[styles.company, styles.us].join(" ")}>
                                    <div>
                                        <div><i className="fa fa-address-book fa-2x" aria-hidden="true"></i></div>
                                        <div>Osun Health Insurance Scheme</div>
                                        <div>OHIS Office Address:  Gbongan-Ibadan Road, Osogbo.</div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;