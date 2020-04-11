import { combineReducers } from "redux";

import RoleReducer from "./reducers/Role.reducer";
import App from '@iso/redux/app/reducer';
import UserReducer from "./reducers/User.reducer";
import MenuReducer from "./reducers/Menu.reducer";
import ClaimReducer from "./reducers/Claim.reducer";
import PlanReducer from "./reducers/Plan.reducer";
import AuthReducer from "./reducers/Auth.reducer";
import GuestReducer from "./reducers/Guest.reducer";
import AgentReducer from "./reducers/Agent.reducer";
import { reducer as formReducer } from "redux-form";
import ReferReducer from "./reducers/Refer.reducer";
import PolicyReducer from "./reducers/Policy.reducer";
import InvoiceReducer from "./reducers/Invoice.reducer";
import ServiceReducer from "./reducers/Service.reducer";
import ProfileReducer from "./reducers/Profile.reducer";
import QuestionReducer from "./reducers/Question.reducer";
import EncounterReducer from "./reducers/Encounter.reducer";
import DependantReducer from "./reducers/Dependant.reducer";
import ChoseRoleReducer from "./reducers/ChoseRole.reducer";
import PermissionReducer from "./reducers/Permission.reducer";
import TransactionReducer from "./reducers/Transaction.reducer";
import BeneficiaryReducer from "./reducers/Beneficiary.reducer";
import PlanServiceReducer from "./reducers/PlanService.reducer";
import EnrolleeReducer from "./reducers/Enrollee.reducer";
import TreatmentCaseReducer from "./reducers/TreatmentCase.reducer";
import takePictureReducer from "../ui/Modal/TakePicture/TakePicture.reducer";
import OrganizationProfileReducer from "./reducers/OrganizationProfile.reducer";

import modalReducer from "../ui/Modal/Modal.reducer";
import ChangePassword from "./reducers/ChangePassword.reducer";
import GeneralReducer from "./reducers/General.reducer";
import LoaderReducer from "./reducers/Loader.reducer";

import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import Ecommerce from '@iso/redux/ecommerce/reducer';

export default combineReducers({
    ThemeSwitcher,
    LanguageSwitcher,
    App,
    Ecommerce,
    form: formReducer,
    LoaderReducer: LoaderReducer,
    UserReducer: UserReducer,
    RoleReducer: RoleReducer,
    AuthReducer: AuthReducer,
    MenuReducer: MenuReducer,
    PlanReducer: PlanReducer,
    ReferReducer: ReferReducer,
    ClaimReducer: ClaimReducer,
    AgentReducer: AgentReducer,
    modalReducer: modalReducer,
    GuestReducer: GuestReducer,
    PolicyReducer: PolicyReducer,
    InvoiceReducer: InvoiceReducer,
    ServiceReducer: ServiceReducer,
    ProfileReducer: ProfileReducer,
    QuestionReducer: QuestionReducer,
    EnrolleeReducer: EnrolleeReducer,
    DependantReducer: DependantReducer,
    ChoseRoleReducer: ChoseRoleReducer,
    EncounterReducer: EncounterReducer,
    PermissionReducer: PermissionReducer,
    takePictureReducer: takePictureReducer,
    BeneficiaryReducer: BeneficiaryReducer,
    PlanServiceReducer: PlanServiceReducer,
    TransactionReducer: TransactionReducer,
    TreatmentCaseReducer: TreatmentCaseReducer,
    OrganizationProfileReducer: OrganizationProfileReducer,
    ChangePasswordReducer: ChangePassword,
    GeneralReducer: GeneralReducer
});
