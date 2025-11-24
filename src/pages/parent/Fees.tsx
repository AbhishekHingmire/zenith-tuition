import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export default function ParentFees() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600 mt-1">View and pay your child's fees</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fee Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fee Management</h3>
              <p className="text-gray-600">This feature is under development</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
