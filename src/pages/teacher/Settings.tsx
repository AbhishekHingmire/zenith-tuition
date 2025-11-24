import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function TeacherSettings() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-gray-600">This feature is under development</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
