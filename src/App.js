import React, { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import GuestAuth from "./shared/utils/GuestAuth";
import RequiresAuth from "./shared/utils/RequireAuth";

const GuestPolicy = lazy(() => import("./containers/Pages/Guest/PolicyPage/PolicyPage"));
const GuestBenefit = lazy(() => import("./containers/Pages/Guest/Benefits/BenefitPage"));
const ChoseRole = lazy(() => import("./containers/Pages/Private/ChoseRole/ChoseRole.page"));
const GuestOrganizationProfileAll = lazy(() => import("./containers/Pages/Guest/OrganizationProfileAll/OrganizationProfileAll"));

const GuestPolicyAdd = lazy(() => import("./containers/Pages/Guest/PolicyPage/Add/PolicyAdd"));
const GuestOrganizationProfile = lazy(() => import("./containers/Pages/Guest/OrganizationProfile/OrganizationProfile"));
const GuestOrganizationProfileAdd = lazy(() => import("./containers/Pages/Guest/OrganizationProfile/Add/OrganizationProfileAdd"));

const PlanAdd = lazy(() => import("./pages/Plan/Add/PlanAdd"));
const PlanAll = lazy(() => import("./pages/Plan/All/PlanAll"));
const PlanEdit = lazy(() => import("./pages/Plan/Edit/PlanEdit"));

const Dashboard = lazy(() => import('./pages/Dashboard/DashboardPage'));
const GuestHome = lazy(() => import("./containers/Pages/Home/HomePage"));
const Auth = lazy (() => import("./containers/Pages/SignIn/SignIn"));

const RoleAll = lazy(() => import("./pages/Role/All/RoleAll"));
const RoleAdd = lazy(() => import("./pages/Role/Add/RoleAdd")); 
const RoleEdit = lazy(() => import("./pages/Role/Edit/RoleEdit"));

const ModeratorAdd = lazy(() => import("./pages/Moderator/Add/ModeratorAdd"));
const ModeratorAll = lazy(() => import("./pages/Moderator/All/ModeratorAll"));

const AgentAdd = lazy(() => import("./pages/Agent/Add/AgentAdd"));
const AgentAll = lazy(() => import("./pages/Agent/All/AgentAll"));

const BankAdd = lazy(() => import("./pages/Bank/Add/BankAdd"));
const BankAll = lazy(() => import("./pages/Bank/All/BankAll"));

const PolicyAdd = lazy(() => import("./pages/Policy/Add/PolicyAdd"));
const PolicyAll = lazy(() => import("./pages/Policy/All/PolicyAll"));
const PolicyView = lazy(() => import("./pages/Policy/View/PolicyView"));
const PolicyEdit = lazy(() => import("./pages/Policy/Edit/PolicyEdit"));

const CompanyAll = lazy(() => import("./pages/Company/All/CompanyAll"));
const CompanyAdd = lazy(() => import("./pages/Company/Add/CompanyAdd"));

const ProviderAdd = lazy(() => import("./pages/Provider/Add/ProviderAdd"));
const ProviderAll = lazy(() => import("./pages/Provider/All/ProviderAll"));
const ProviderView = lazy(() => import("./pages/Provider/View/ProviderView"));
const ProviderMyBeneficiary = lazy(() => import("./pages/ProviderBeneficiary/ProviderBeneficiary"));
const EnrolleeView = lazy(() => import("./pages/Enrollee/View/EnrolleeView"));

const ServiceAll = lazy(() => import("./pages/Service/All/ServiceAll"));
const ServiceAdd =  lazy(() => import("./pages/Service/Add/ServiceAdd"));
const ServiceEdit = lazy(() => import("./pages/Service/Edit/ServiceEdit"));

const EncounterAdd = lazy(() => import("./pages/Encounter/Add/EncounterAdd"));
const EncounterAll = lazy(() => import("./pages/Encounter/All/EncounterAll"));

const PlanServiceAll = lazy(() => import("./pages/PlanServiceAll/PlanServiceAll"));
const PlanServiceAdd = lazy(() => import("./pages/PlanServiceAdd/PlanServiceAdd"));
const PlanServiceEdit = lazy(() => import("./pages/PlanServiceEdit/PlanServiceEdit"));
const PlanView = lazy(() => import("./pages/Plan/View/PlanView"));

const ProfileShow = lazy(() => import("./pages/ProfileShow/ProfileShow"));
const DependantAdd = lazy(() => import("./pages/DependantAdd/DependantAdd"));
const DependantShow = lazy(() => import("./pages/DependantShow/DependantShow"));

const BeneficiaryAdd = lazy(() => import("./pages/Beneficiary/Add/BeneficiaryAdd"));
const BeneficiaryAddCard = lazy(() => import("./pages/Beneficiary/AddCard/BeneficiaryAddCard"));

const BeneficiaryEdit = lazy(() => import("./pages/Beneficiary/Edit/BeneficiaryEdit"));
const BeneficiaryAll = lazy(() => import("./pages/Beneficiary/All/BeneficiaryAll"));

const CompanyBeneficiary = lazy(() => import("./pages/Company/Beneficiary/CompanyBeneficiary"));
const ProviderBeneficiary = lazy(() => import("./pages/ProviderBeneficiary/ProviderBeneficiary"));
const CompanyMyBeneficiary = lazy(() => import("./pages/Company/MyBeneficiary/CompanyMyBeneficiary"));

const BankMyBeneficiary = lazy(() => import("./pages/Bank/MyBeneficiary/BankMyBeneficiary"));
const AgentMyBeneficiary = lazy(() => import("./pages/Agent/MyBeneficiary/AgentMyBeneficiary"));

const ModalManager = lazy(() => import("./ui/Modal/ModalManager.component"));

const Transaction = lazy(() => import("./pages/Transaction/Transaction"));
const BillingInformation = lazy(() => import("./pages/BillingInformation/BillingInformation"));

const ClaimAll = lazy(() => import("./pages/Claims/All/ClaimsAll"));
const ClaimService = lazy(() => import("./pages/ClaimService/ClaimService"));

const QuestionAdd = lazy(() => import("./pages/QuestionAdd/QuestionAdd"));
const MyTransaction = lazy(() => import("./pages/MyTransaction/MyTransaction"));
// const GuestOrganizationProfileSelect = lazy(() => import("./pages/GuestOrganizationProfileSelect"));

const ReferralAll = lazy(() => import("./pages/ReferralAll/ReferralAll"));

// const ReferAdd = lazy(() => import("./pages/ReferAdd"));
// const ReferralView = lazy(() => import("./pages/ReferralView"));

const PreAuthAdd = lazy(() => import("./pages/PreAuth/Add/PreAuthAdd"));
const PreAuthAll = lazy(() => import("./pages/PreAuth/All/PreAuthAll"));
// const PreAuthEdit = lazy(() => import("./pages/PreAuthEdit"));

const ChangePassword = lazy(() => import("./pages/ChangePassword/ChangePassword"));

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ModalManager />

                <Switch>
                    <Route path="/dashboard/my_transaction_:id" exact component={MyTransaction} />
                    <Route path="/" exact component={GuestAuth(GuestHome)} />
                    <Route path="/guest_policy" exact component={GuestAuth(GuestPolicy)} />
                    <Route path="/guest_benefit" exact component={GuestAuth(GuestBenefit)} />
                    <Route path="/guest_organization_profile_add_:slug" exact component={GuestAuth(GuestOrganizationProfileAdd)} />
                    {/* <Route path="/guest_organization_profile_select" exact component={GuestAuth(GuestOrganizationProfileSelect)} /> */}
                    <Route path="/guest_organization_profile_:slug" exact component={GuestAuth(GuestOrganizationProfileAll)} />
                    <Route path="/guest_organization_profile" exact component={GuestAuth(GuestOrganizationProfile)} />
                    <Route path="/guest_policy_add_:policyId" exact component={GuestAuth(GuestPolicyAdd)} />
                    
                    <Route path="/signin" exact component={Auth} />

                    <Route path="/chose_role" exact component={RequiresAuth(ChoseRole)} />
                    <Route path="/dashboard" exact component={RequiresAuth(Dashboard)} />

                    <Route path="/dashboard/agent_all" component={RequiresAuth(AgentAll)} />
                    <Route path="/dashboard/agent_add" component={RequiresAuth(AgentAdd)} />
                    <Route path="/dashboard/agent_view/:id" exact component={RequiresAuth(ProviderView)} />
                    <Route path="/dashboard/transaction" exact component={RequiresAuth(Transaction)} />
                    <Route path="/dashboard/agent_my_beneficiary" exact component={RequiresAuth(AgentMyBeneficiary)} />

                    <Route path="/dashboard/beneficiary_all" component={RequiresAuth(BeneficiaryAll)} />
                    <Route path="/dashboard/beneficiary_add" component={RequiresAuth(BeneficiaryAdd)} />
                    <Route path="/dashboard/beneficiary_card_:transaction_id" exact component={RequiresAuth(BeneficiaryAddCard)} />
                    <Route path="/dashboard/beneficiary_edit_:slug" exact component={RequiresAuth(BeneficiaryEdit)} />

                    <Route path="/dashboard/bank_add" exact component={RequiresAuth(BankAdd)} />
                    <Route path="/dashboard/bank_all" exact component={RequiresAuth(BankAll)} />
                    <Route path="/dashboard/bank_my_beneficiary" exact component={RequiresAuth(BankMyBeneficiary)} />

                    <Route path="/dashboard/change_password" exact component={ChangePassword} />

                    <Route path="/dashboard/company_all" exact component={RequiresAuth(CompanyAll)} />
                    <Route path="/dashboard/company_add" exact component={RequiresAuth(CompanyAdd)} />
                    <Route path="/dashboard/company_all-beneficiary_:slug" exact component={RequiresAuth(CompanyBeneficiary)} />
                    <Route path="/dashboard/company_my_beneficiary" exact component={RequiresAuth(CompanyMyBeneficiary)} />

                    <Route path="/dashboard/claim_all" component={RequiresAuth(ClaimAll)} />
                    <Route path="/dashboard/claim_all/:claims" component={RequiresAuth(PreAuthAll)} />
                    <Route path="/dashboard/claim_service_:slug" exact component={RequiresAuth(ClaimService)} />
                    <Route path="/dashboard/claim_services/:claims" exact component={RequiresAuth(ReferralAll)} />

                    <Route path="/dashboard/dependant_add_:slug?" exact component={RequiresAuth(DependantAdd)} />
                    <Route path="/dashboard/dependant_show_:slug?" exact component={RequiresAuth(DependantShow)} />

                    <Route path="/dashboard/encounter_add_:enrollee_id?" exact component={RequiresAuth(EncounterAdd)} />
                    <Route path="/dashboard/encounter_all" exact component={RequiresAuth(EncounterAll)} />

                    <Route path="/dashboard/moderator_all" component={RequiresAuth(ModeratorAll)} />
                    <Route path="/dashboard/moderator_add" component={RequiresAuth(ModeratorAdd)} />

                    <Route path="/dashboard/policy_add" exact component={RequiresAuth(PolicyAdd)} />
                    <Route path="/dashboard/policy_all" exact component={RequiresAuth(PolicyAll)} />
                    <Route path="/dashboard/policy_view_:slug" exact component={RequiresAuth(PolicyView)} />
                    <Route path="/dashboard/policy_edit_:slug" exact component={RequiresAuth(PolicyEdit)} />

                    <Route path="/dashboard/plan_service_add" exact component={RequiresAuth(PlanServiceAdd)} />
                    <Route path="/dashboard/plan_service_all" exact component={RequiresAuth(PlanServiceAll)} />
                    <Route path="/dashboard/plan_service_edit_:slug" exact component={RequiresAuth(PlanServiceEdit)} />

                    <Route path="/dashboard/plan_add" exact component={RequiresAuth(PlanAdd)} />
                    <Route path="/dashboard/plan_all" exact component={RequiresAuth(PlanAll)} />
                    <Route path="/dashboard/plan_view_:slug" exact component={RequiresAuth(PlanView)} />
                    <Route path="/dashboard/plan_edit_:slug" exact component={RequiresAuth(PlanEdit)} />

                    <Route path="/dashboard/profile_show_:slug" exact component={RequiresAuth(ProfileShow)} />
                    <Route path="/dashboard/billing_information_:user_id?" exact component={RequiresAuth(BillingInformation)} />

                    <Route path="/dashboard/provider_all" component={RequiresAuth(ProviderAll)} />
                    <Route path="/dashboard/provider_add" component={RequiresAuth(ProviderAdd)} />
                    <Route path="/dashboard/provider_view/:id" exact component={RequiresAuth(ProviderView)} />
                    <Route path="/dashboard/provider_all-beneficiary_:slug" exact component={RequiresAuth(ProviderBeneficiary)} />
                    <Route path="/dashboard/provider_my_beneficiary" exact component={RequiresAuth(ProviderMyBeneficiary)} />
                    <Route path="/dashboard/enrollee_view_:slug" exact component={RequiresAuth(EnrolleeView)} />

                    <Route path="/dashboard/service_add" exact component={RequiresAuth(ServiceAdd)} />
                    <Route path="/dashboard/service_all" exact component={RequiresAuth(ServiceAll)} />
                    <Route path="/dashboard/service_edit_:slug" exact component={RequiresAuth(ServiceEdit)} />
                    <Route path="/dashboard/services/:type" exact component={RequiresAuth(ReferralAll)} />

                    <Route path="/dashboard/role_all" exact component={RequiresAuth(RoleAll)} />
                    <Route path="/dashboard/role_add" exact component={RequiresAuth(RoleAdd)} />
                    <Route path="/dashboard/role_edit_:slug" exact component={RequiresAuth(RoleEdit)} />

                    <Route path="/dashboard/question_add" exact component={RequiresAuth(QuestionAdd)} />

                    <Route path="/dashboard/visitation_add_:slug" exact component={RequiresAuth(PreAuthAdd)} />
                    <Route path="/dashboard/visitation/:type" exact component={RequiresAuth(PreAuthAll)} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
