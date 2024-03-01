import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CustomerDashboardTemplate from './CustomerDashboardTemplate';

export default function Dashboard({ auth, webInfo, geoLocation }: PageProps) {
    return (
        <CustomerDashboardTemplate auth={auth} headerText="Dashboard" webInfo={webInfo} geoLocation={geoLocation} currentTransaction={auth?.currentTransaction}>
            lol
        </CustomerDashboardTemplate>

    );
}
