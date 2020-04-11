const hmoMenus = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    leftIcon: 'ion-android-menu',
  },
  {
    key: 'dashboard/agent_all',
    label: 'Agents',
    leftIcon: 'ion-person',
  },
  {
    key: 'dashboard/services/refer',
    label: 'Authorizations',
    leftIcon: 'ion-android-menu',
  },
  {
    key: 'dashboard/bank_all',
    label: 'Banks',
    leftIcon: 'ion-android-menu',
  },
  {
    key: 'dashboard/beneficiary_all',
    label: 'Beneficiary',
    leftIcon: 'ion-android-person-add',
    type: true
  },
  {
    key: 'dashboard/plan_service_all',
    label: 'Benefits & Tarrif',
    leftIcon: 'ion-arrow-graph-up-right',
  },
  {
    key: 'dashboard/company_all',
    label: 'Companies',
    leftIcon: 'ion-android-menu',
  },
  {
    key: 'dashboard/claim_all/claim',
    label: 'Claims',
    leftIcon: 'ion-android-mail',
  },
  {
    key: 'dashboard/visitation/preauth',
    label: 'Encounters',
    leftIcon: 'ion-ios-paper',
  },
  {
    key: 'dashboard/moderator_all',
    label: 'Moderator',
    leftIcon: 'ion-android-options',
    type: true
  },
  {
    key: 'dashboard/policy_all',
    label: 'Policies',
    leftIcon: 'ion-clipboard',
  },
  {
    key: 'dashboard/plan_all',
    label: 'Plans',
    leftIcon: 'ion-calendar',
  },
  {
    key: 'dashboard/provider_all',
    label: 'Providers',
    leftIcon: 'ion-android-menu',
  },
  {
    key: 'dashboard/service_all',
    label: 'Services',
    leftIcon: 'ion-grid',
  }
];

const companyMenus = [
  {
    key: 'dashboard/beneficiary_all',
    label: 'Beneficiary',
    leftIcon: 'ion-android-person-add',
    type: true
  },
  {
    key: 'dashboard/moderator_all',
    label: 'Moderator',
    leftIcon: 'ion-android-menu',
    type: true
  }
];

const providerMenus = [
  {
    key: 'dashboard/provider_my_beneficiary',
    label: 'Beneficiary',
    leftIcon: 'ion-android-person-add',
    type: true
  },
  {
    key: 'dashboard/moderator_add',
    label: 'Moderator',
    leftIcon: 'ion-android-menu',
    type: true
  },
  {
    key: 'dashboard/visitation/preauth',
    label: 'Encounter',
    leftIcon: 'ion-grid',
    type: true
  },
  {
    key: 'dashboard/services/refer',
    label: 'Authorization',
    leftIcon: 'ion-clipboard',
    type: true
  },
  {
    key: 'dashboard/claim_all/claim',
    label: 'Claims',
    leftIcon: 'ion-android-mail',
    type: true
  }
];

const bankMenus = [
  {
    key: 'dashboard/transaction',
    label: 'Transaction',
    leftIcon: 'ion-grid',
    type: true
  },
  {
    key: 'dashboard/bank_my_beneficiary',
    label: 'Beneficiary',
    leftIcon: 'ion-android-menu',
    type: true
  }
];


export {hmoMenus, companyMenus, providerMenus, bankMenus};
