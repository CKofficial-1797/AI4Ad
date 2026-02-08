import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ABTesting = () => {

  const tests = [
    {
      id: 1,
      name: 'Black Friday Headlines',
      status: 'Running',
      variantA: 'Transform Your Business Today',
      variantB: 'Unlock Business Growth Now',
      winner: null,
      confidence: '85%',
      improvement: '+12%'
    },
    {
      id: 2,
      name: 'CTA Button Test',
      status: 'Completed',
      variantA: 'Get Started Free',
      variantB: 'Start Free Trial',
      winner: 'B',
      confidence: '95%',
      improvement: '+23%'
    }
  ];

  return (
    <DashboardLayout 
      title="A/B Testing" 
      subtitle="Monitor and analyze your split tests"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button className="bg-gold hover:bg-gold-600 text-navy font-outfit font-medium">
            Create New Test
          </Button>
        </div>

        <div className="grid gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-navy font-inter">{test.name}</h3>
                  <Badge className={test.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {test.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 font-inter">Confidence: {test.confidence}</div>
                  {test.improvement && (
                    <div className="text-green-600 font-semibold font-inter">{test.improvement}</div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 border rounded-lg ${test.winner === 'A' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="font-medium text-navy font-inter">Variant A</div>
                  <div className="text-gray-700 font-inter">{test.variantA}</div>
                  {test.winner === 'A' && <Badge className="mt-2 bg-green-100 text-green-800">Winner</Badge>}
                </div>
                <div className={`p-4 border rounded-lg ${test.winner === 'B' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                  <div className="font-medium text-navy font-inter">Variant B</div>
                  <div className="text-gray-700 font-inter">{test.variantB}</div>
                  {test.winner === 'B' && <Badge className="mt-2 bg-green-100 text-green-800">Winner</Badge>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ABTesting;