import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CampaignForm } from '@/types/campaignForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import apiClient from '@/lib/api';

interface AIAdCreativeProps {
  onNext: () => void;
  onPrev: () => void;
  onUpdate: (data: Partial<CampaignForm>) => void;
  formData: CampaignForm;
}

const AIAdCreative: React.FC<AIAdCreativeProps> = ({ onNext, onPrev, onUpdate, formData }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adCopy, setAdCopy] = useState<any>(null);
  const [selectedHeadlines, setSelectedHeadlines] = useState<string[]>([]);
  const [selectedPrimaryTexts, setSelectedPrimaryTexts] = useState<string[]>([]);

  const handleGenerateAdCopy = async () => {
    setIsLoading(true);
    try {
      const headersList = {
        "Content-Type": "application/json"
      };
      const bodyContent = JSON.stringify({
        "Prompt": prompt,
      });
      const reqOptions = {
        url: import.meta.env.VITE_AD_COPY_GENERATOR_URL,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      const response = await apiClient.request(reqOptions);
      setAdCopy(response.data);
    } catch (error) {
      console.error('Failed to generate ad copy:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeadlineSelect = (headline: string) => {
    setSelectedHeadlines(prev =>
      prev.includes(headline)
        ? prev.filter(h => h !== headline)
        : [...prev, headline].slice(0, 2)
    );
  };

  const handlePrimaryTextSelect = (text: string) => {
    setSelectedPrimaryTexts(prev =>
      prev.includes(text)
        ? prev.filter(t => t !== text)
        : [...prev, text].slice(0, 2)
    );
  };

  const handleNext = () => {
    onUpdate({
      creative: {
        ...formData.creative,
        name: 'AI Generated Ad',
        object_story_spec: {
          ...formData.creative?.object_story_spec,
          link_data1: {
            ...formData.creative?.object_story_spec?.link_data1,
            name: selectedHeadlines[0],
            message: selectedPrimaryTexts[0],
          },
          link_data2: {
            ...formData.creative?.object_story_spec?.link_data2,
            name: selectedHeadlines[1],
            message: selectedPrimaryTexts[1],
          },
        },
      },
    });
    onNext();
  };

  const callToActionTypes: Array<{value: string, label: string}> = [
    { value: "SHOP_NOW", label: "Shop Now" },
    { value: "BOOK_TRAVEL", label: "Book Travel" },
    { value: "LEARN_MORE", label: "Learn More" },
    { value: "SIGN_UP", label: "Sign Up" },
    { value: "DOWNLOAD", label: "Download" },
    { value: "INSTALL_MOBILE_APP", label: "Install Mobile App" },
    { value: "USE_MOBILE_APP", label: "Use Mobile App" },
    { value: "WATCH_VIDEO", label: "Watch Video" },
    { value: "WATCH_MORE", label: "Watch More" },
    { value: "OPEN_LINK", label: "Open Link" },
  ];


  return (
    <Card>
      <CardHeader>
        <h2 className="text-3xl font-bold text-gray-900">Generate Ad with AI</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="ad-prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Describe Your Ad
          </label>
          <textarea
            name="ad-prompt"
            id="ad-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300'
            placeholder="e.g., Create an ad for a new line of summer clothing."
          />
          <Button onClick={handleGenerateAdCopy} disabled={isLoading || !prompt} className="mt-2">
            {isLoading ? 'Generating...' : 'Generate Ad Copy'}
          </Button>
        </div>

        {adCopy && (
          <>
            <div>
              <h3 className="text-xl font-semibold mb-2">Headlines (Select 2)</h3>
              <div className="space-y-2">
                {Object.values(adCopy.Headlines).map((headline: any) => (
                  <Card
                    key={headline}
                    className={`p-4 cursor-pointer ${selectedHeadlines.includes(headline) ? 'border-blue-500 border-2' : 'border'}`}
                    onClick={() => handleHeadlineSelect(headline)}
                  >
                    {headline}
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Primary Texts (Select 2)</h3>
              <div className="space-y-2">
                {Object.values(adCopy.PrimaryTexts).map((text: any) => (
                  <Card
                    key={text}
                    className={`p-4 cursor-pointer ${selectedPrimaryTexts.includes(text) ? 'border-blue-500 border-2' : 'border'}`}
                    onClick={() => handlePrimaryTextSelect(text)}
                  >
                    {text}
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        <div>
          <label htmlFor="call-to-action" className="block text-sm font-medium text-gray-700 mb-1">
            Call to Action
          </label>
          <Select onValueChange={(value) => onUpdate({
            creative: {
              ...formData.creative,
              object_story_spec: {
                ...formData.creative?.object_story_spec,
                call_to_action: {
                  ...formData.creative?.object_story_spec?.call_to_action,
                  type: value
                }
              }
            }
          })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a call to action" />
            </SelectTrigger>
            <SelectContent>
              {callToActionTypes.map((cta) => (
                <SelectItem key={cta.value} value={cta.value}>{cta.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
            Link
          </label>
          <input
            id="link"
            type="text"
            value={formData?.creative?.object_story_spec?.link || ''}
            onChange={(e) => onUpdate({
              creative: {
                ...formData.creative,
                object_story_spec: {
                  ...formData.creative?.object_story_spec,
                  link: e.target.value
                }
              }
            })}
            placeholder="E.g., https://example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300`}
          />
        </div>
        <div className="flex justify-between">
          <Button onClick={onPrev} variant="outline">
            Prev
          </Button>
          <Button onClick={handleNext} disabled={selectedHeadlines.length < 2 || selectedPrimaryTexts.length < 2}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAdCreative;
