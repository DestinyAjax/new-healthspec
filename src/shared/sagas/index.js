import { all } from "redux-saga/effects";

import UserSaga from "./User.saga";
import RoleSaga from "./Role.saga";
import PlanSaga from "./Plan.saga";
import AuthSaga from "./Auth.saga";
import GuestSaga from "./Guest.saga";
import AgentSaga from "./Agent.saga";
import ClaimSaga from "./Claim.saga";
import ReferSaga from "./Refer.saga";
import PolicySaga from "./Policy.saga";
import InvoiceSaga from "./Invoice.saga";
import ServiceSaga from "./Service.saga";
import ProfileSaga from "./Profile.saga";
import QuestionSaga from "./Question.saga";
import DependantSaga from "./Dependant.saga";
import EncounterSaga from "./Encounter.saga";
import PermissionSaga from "./Permission.saga";
import BeneficiarySaga from "./Beneficiary.saga";
import TransactionSaga from "./Transaction.saga";
import EnrolleeSaga from "./Enrollee.saga";
import TreatmentCaseSaga from "./TreatmentCase.saga";
import PlanServiceSaga from "./PlanService.saga";
import OrganizationProfileSaga from "./OrganizationProfile.saga";
import ChangePasswordSaga from "./ChangePassword.saga";
import GeneralSaga from "./General.saga";

function* rootSaga() {
    yield all([
        UserSaga(),
        RoleSaga(),
        PlanSaga(),
        AuthSaga(),
        AgentSaga(),
        GuestSaga(),
        ClaimSaga(),
        ReferSaga(),
        PolicySaga(),
        InvoiceSaga(),
        ProfileSaga(),
        ServiceSaga(),
        QuestionSaga(),
        DependantSaga(),
        EnrolleeSaga(),
        EncounterSaga(),
        PermissionSaga(),
        BeneficiarySaga(),
        PlanServiceSaga(),
        TransactionSaga(),
        TreatmentCaseSaga(),
        OrganizationProfileSaga(),
        ChangePasswordSaga(),
        GeneralSaga()
    ]);
}

export default rootSaga;
