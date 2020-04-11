import React, {Fragment} from 'react';
import FooterComponent from '../../Home/components/Footer/FooterComponent';
import HeaderComponent from '../../Home/components/Header/HeaderComponent';
import BenefitPageStyleWrapper from './BenefitPage.style';
import Datatable from '../../../../ui/Datatable';
import '../../Home/style.css';

export default function BenefitPage() {
    return (
        <Fragment>
            <HeaderComponent />
            <BenefitPageStyleWrapper className="isoBenefitPageWrapper">
                <section className="second-section">
                    <div className="row mb-2 text-center">
                        <div className="col-md-12">
                            <h2 className="mb-2">Osun Health Insurance Scheme Benefits</h2>
                            <span className="bar"></span>
                        </div>
                    </div>
                </section>
                <div className="container mt-4">
                    <div className="download">
                        <a className="button" href={require('../../../../assets/images/benefit.doc')} download>Download All</a>
                    </div>
                    <div className="datatable">
                        <Datatable
                            columns={[
                                {
                                    key: 'id',
                                    title: 'ID',
                                    cell: 'Default',
                                    dataIndex: 'id',
                                    searchable: false,
                                },
                                {
                                    cell: 'Default',
                                    searchable: true,
                                    key: 'name',
                                    title: 'Name',
                                    dataIndex: 'name',
                                    search_key: 'name',
                                    sorter: (a, b) => a.name.length - b.name.length,
                                },
                                {
									cell: 'Default',
									key: 'service_category',
                                    dataIndex: 'service_category',
									searchable: true,
									title: 'Category',
									search_key: 'service_category',
                                    sorter: (a, b) => a.service_category.length - b.service_category.length,
								},
								{
									cell: 'Default',
									key: 'full_type',
									searchable: false,
									title: 'Type',
                                    dataIndex: 'full_type',
									search_key: 'type',
								},
                            ]}
                            url={`service/index`}
                            actions={[]}
                        />
                    </div>
                </div>
            </BenefitPageStyleWrapper>
            <FooterComponent bottomFooter={false}/>
        </Fragment>  
    );
};