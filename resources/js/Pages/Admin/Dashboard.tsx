import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminDashboardTemplate from './AdminDashboardTemplate';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AdminDashboardTemplate auth={auth} headerText="Dashboard">
            Dashboard content
        </AdminDashboardTemplate>
    );
}
