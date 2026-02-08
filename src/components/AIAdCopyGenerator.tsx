import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface AdCopy {
  id: string;
  type: 'headline' | 'primary';
  text: string;
  selected: boolean;
}

const AIAdCopyGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCopies, setGeneratedCopies] = useState<AdCopy[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Hardcoded AI-generated responses for demo
  const sampleCopies = {
    headlines: [
      "Transform Your Business with AI-Powered Automation",
      "Boost ROI by 300% with Smart Campaign Management",
      "The Future of Digital Marketing is Here"
    ],
    primaryTexts: [
      "Discover how leading brands are using LVL Automation to optimize their ad campaigns in real-time. Our AI continuously monitors performance and adjusts budgets to maximize your return on investment.",
      "Stop wasting money on underperforming ads. LVL Automation's intelligent system identifies top performers and reallocates budgets automatically, ensuring every dollar works harder for your business.",
      "Join thousands of marketers who trust LVL Automation to manage their campaigns 24/7. Advanced AI technology meets simple, intuitive design for campaigns that actually deliver results."
    ]
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a campaign prompt to generate ad copy.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setShowResults(false);

    // Simulate AI generation
    setTimeout(() => {
      const newCopies: AdCopy[] = [
        ...sampleCopies.headlines.map((text, index) => ({
          id: `headline-${index}`,
          type: 'headline' as const,
          text,
          selected: false
        })),
        ...sampleCopies.primaryTexts.map((text, index) => ({
          id: `primary-${index}`,
          type: 'primary' as const,
          text,
          selected: false
        }))
      ];

      setGeneratedCopies(newCopies);
      setShowResults(true);
      setIsGenerating(false);
      
      toast({
        title: "Ad Copy Generated",
        description: "AI has generated multiple variations for your campaign.",
      });
    }, 2000);
  };

  const handleToggleSelection = (id: string) => {
    setGeneratedCopies(prev => 
      prev.map(copy => 
        copy.id === id ? { ...copy, selected: !copy.selected } : copy
      )
    );
  };

  const handleCreateABTest = () => {
    const selectedCopies = generatedCopies.filter(copy => copy.selected);
    const headlines = selectedCopies.filter(copy => copy.type === 'headline');
    const primaryTexts = selectedCopies.filter(copy => copy.type === 'primary');

    if (headlines.length < 2 || primaryTexts.length < 2) {
      toast({
        title: "Selection Required",
        description: "Please select at least 2 headlines and 2 primary texts for A/B testing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "A/B Test Created",
      description: `Created A/B test with ${headlines.length} headlines and ${primaryTexts.length} primary texts.`,
    });
  };

  const selectedCount = generatedCopies.filter(copy => copy.selected).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Input Section */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">AI Ad Copy Generator</CardTitle>
          <CardDescription>
            Generate compelling headlines and ad copy using advanced AI. Select your favorites for A/B testing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Campaign Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe your product, target audience, and campaign goals. Example: 'Generate ad copy for a fitness app targeting busy professionals aged 25-40 who want to workout from home in 20 minutes or less.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-slate-900 hover:bg-slate-800"
          >
            {isGenerating ? "Generating AI Copy..." : "Generate Ad Copy"}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Headlines */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Headlines</span>
                <Badge variant="outline" className="text-slate-600">
                  {generatedCopies.filter(c => c.type === 'headline' && c.selected).length} selected
                </Badge>
              </CardTitle>
              <CardDescription>Choose your best performing headlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedCopies
                .filter(copy => copy.type === 'headline')
                .map((copy) => (
                  <div key={copy.id} className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <Checkbox
                      id={copy.id}
                      checked={copy.selected}
                      onCheckedChange={() => handleToggleSelection(copy.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor={copy.id} className="text-slate-900 font-medium cursor-pointer">
                        {copy.text}
                      </label>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Primary Texts */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Primary Texts</span>
                <Badge variant="outline" className="text-slate-600">
                  {generatedCopies.filter(c => c.type === 'primary' && c.selected).length} selected
                </Badge>
              </CardTitle>
              <CardDescription>Choose your best converting ad copy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedCopies
                .filter(copy => copy.type === 'primary')
                .map((copy) => (
                  <div key={copy.id} className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <Checkbox
                      id={copy.id}
                      checked={copy.selected}
                      onCheckedChange={() => handleToggleSelection(copy.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor={copy.id} className="text-slate-900 cursor-pointer">
                        {copy.text}
                      </label>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Section */}
      {showResults && (
        <Card className="border-slate-200 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">A/B Test Configuration</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Selected {selectedCount} items. Choose at least 2 headlines and 2 primary texts for optimal testing.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="border-slate-300">
                  Regenerate Copy
                </Button>
                <Button 
                  onClick={handleCreateABTest}
                  className="bg-slate-900 hover:bg-slate-800"
                >
                  Create A/B Test
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAdCopyGenerator;