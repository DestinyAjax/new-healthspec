import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const CompanyAll = lazy(() => import("../../pages/Company/All/CompanyAll"));
const Dashboard = lazy(() => import('../../pages/Dashboard/DashboardPage'));

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="" exact component={Dashboard} />
        <Route path="/dashboard/company_all" exact component={CompanyAll} />
      </Switch>
    </Suspense>
  );
}
