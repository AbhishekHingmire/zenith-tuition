import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

export default function StudentMessages() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">Chat with your teachers</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Messages & Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Messages</h3>
              <p className="text-muted-foreground">This feature will be implemented in Phase 2</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
