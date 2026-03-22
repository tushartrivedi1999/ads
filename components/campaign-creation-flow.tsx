'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronRight, ImagePlus, MapPin, Target, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Ad, AdSet, Campaign, CreativeType } from '@/types/campaign';

type StepId = 'campaign' | 'adset' | 'creative' | 'review';

type FlowData = {
  name: string;
  budget: string;
  start_date: string;
  end_date: string;
  location: string;
  audience: string;
  budget_split: string;
  creative_type: CreativeType | '';
  headline: string;
  description: string;
  media_file_name: string;
};

type FlowErrors = Partial<Record<keyof FlowData, string>>;

const steps: Array<{ id: StepId; title: string; description: string }> = [
  { id: 'campaign', title: 'Campaign Details', description: 'Set the campaign basics and timing.' },
  { id: 'adset', title: 'Ad Set', description: 'Choose targeting and split the budget.' },
  { id: 'creative', title: 'Ad Creative', description: 'Add the creative asset and messaging.' },
  { id: 'review', title: 'Review & Submit', description: 'Confirm everything before launch.' },
];

const cityOptions = ['New York', 'Los Angeles', 'Chicago', 'Austin', 'Miami', 'Seattle'];
const audienceOptions = ['Broad audience', 'Lookalike audience', 'Retargeting audience', 'Custom intent audience'];
const creativeTypes: CreativeType[] = ['image', 'video', 'text'];

const initialData: FlowData = {
  name: '',
  budget: '',
  start_date: '',
  end_date: '',
  location: '',
  audience: '',
  budget_split: '',
  creative_type: '',
  headline: '',
  description: '',
  media_file_name: '',
};

export function CampaignCreationFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FlowData>(initialData);
  const [errors, setErrors] = useState<FlowErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  const updateField = <K extends keyof FlowData>(field: K, value: FlowData[K]) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setSubmitted(false);
  };

  const validateStep = (stepIndex: number) => {
    const nextErrors: FlowErrors = {};

    if (stepIndex === 0) {
      if (!formData.name.trim()) nextErrors.name = 'Campaign name is required.';
      if (!formData.budget || Number(formData.budget) <= 0) nextErrors.budget = 'Budget must be greater than 0.';
      if (!formData.start_date) nextErrors.start_date = 'Start date is required.';
      if (!formData.end_date) nextErrors.end_date = 'End date is required.';
      if (formData.start_date && formData.end_date && formData.end_date < formData.start_date) {
        nextErrors.end_date = 'End date must be after the start date.';
      }
    }

    if (stepIndex === 1) {
      if (!formData.location) nextErrors.location = 'Please select a city.';
      if (!formData.audience) nextErrors.audience = 'Please choose an audience.';
      if (!formData.budget_split || Number(formData.budget_split) <= 0) nextErrors.budget_split = 'Budget split must be greater than 0.';
      if (formData.budget && formData.budget_split && Number(formData.budget_split) > Number(formData.budget)) {
        nextErrors.budget_split = 'Budget split cannot exceed campaign budget.';
      }
    }

    if (stepIndex === 2) {
      if (!formData.creative_type) nextErrors.creative_type = 'Choose a creative type.';
      if (!formData.media_file_name) nextErrors.media_file_name = 'Upload an image or video file.';
      if (!formData.headline.trim()) nextErrors.headline = 'Headline is required.';
      if (!formData.description.trim()) nextErrors.description = 'Description is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((value) => Math.min(value + 1, steps.length - 1));
  };

  const goBack = () => {
    setCurrentStep((value) => Math.max(value - 1, 0));
  };

  const handleSubmit = () => {
    if (!validateStep(0) || !validateStep(1) || !validateStep(2)) return;

    const campaign: Campaign = {
      id: 'campaign-temp-1',
      name: formData.name,
      budget: { amount: Number(formData.budget), currency: 'USD' },
      status: 'active',
      start_date: formData.start_date,
      end_date: formData.end_date,
    };

    const adset: AdSet = {
      id: 'adset-temp-1',
      campaign_id: campaign.id,
      location: formData.location,
      audience: formData.audience,
      budget: { amount: Number(formData.budget_split), currency: 'USD' },
    };

    const ad: Ad = {
      id: 'ad-temp-1',
      adset_id: adset.id,
      creative_type: formData.creative_type as CreativeType,
      headline: formData.headline,
      description: formData.description,
      media_url: formData.media_file_name,
    };

    console.log({ campaign, adset, ad });
    setSubmitted(true);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Create campaign</CardTitle>
            <CardDescription>Launch a campaign with a guided flow, inline validation, and a review step before submission.</CardDescription>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-primary-gradient transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (index <= currentStep) setCurrentStep(index);
                  }}
                  className={cn(
                    'rounded-2xl border px-4 py-3 text-left transition-all duration-200',
                    isActive ? 'border-cyan-400/30 bg-cyan-400/10' : 'border-white/10 bg-white/[0.03]',
                    index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-70',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold',
                        isComplete ? 'border-cyan-300/30 bg-cyan-300 text-slate-950' : isActive ? 'border-cyan-400/30 bg-cyan-400/15 text-cyan-300' : 'border-white/10 text-muted-foreground',
                      )}
                    >
                      {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Campaign Name" error={errors.name}>
              <Input placeholder="Spring launch campaign" value={formData.name} onChange={(event) => updateField('name', event.target.value)} />
            </Field>
            <Field label="Budget" error={errors.budget}>
              <Input type="number" min="0" placeholder="5000" value={formData.budget} onChange={(event) => updateField('budget', event.target.value)} />
            </Field>
            <Field label="Start Date" error={errors.start_date}>
              <Input type="date" value={formData.start_date} onChange={(event) => updateField('start_date', event.target.value)} />
            </Field>
            <Field label="End Date" error={errors.end_date}>
              <Input type="date" value={formData.end_date} onChange={(event) => updateField('end_date', event.target.value)} />
            </Field>
          </div>
        ) : null}

        {currentStep === 1 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Location (City)" error={errors.location}>
              <Select value={formData.location} onValueChange={(value) => updateField('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cityOptions.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Audience" error={errors.audience}>
              <Select value={formData.audience} onValueChange={(value) => updateField('audience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  {audienceOptions.map((audience) => (
                    <SelectItem key={audience} value={audience}>{audience}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Budget Split" error={errors.budget_split}>
              <Input type="number" min="0" placeholder="2500" value={formData.budget_split} onChange={(event) => updateField('budget_split', event.target.value)} />
            </Field>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-medium">Guidance</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Start with one city and a broad or retargeting audience. You can expand targeting logic later without changing the step structure.</p>
            </div>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Creative Type" error={errors.creative_type}>
              <Select value={formData.creative_type} onValueChange={(value) => updateField('creative_type', value as CreativeType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose creative type" />
                </SelectTrigger>
                <SelectContent>
                  {creativeTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Upload Image / Video" error={errors.media_file_name}>
              <Input
                type="file"
                accept="image/*,video/*"
                onChange={(event) => updateField('media_file_name', event.target.files?.[0]?.name ?? '')}
              />
            </Field>
            <Field label="Headline" error={errors.headline}>
              <Input placeholder="Reach the right audience faster" value={formData.headline} onChange={(event) => updateField('headline', event.target.value)} />
            </Field>
            <Field label="Description" error={errors.description} className="md:col-span-2">
              <Textarea placeholder="Describe the offer, message, or call to action..." value={formData.description} onChange={(event) => updateField('description', event.target.value)} />
            </Field>
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <SummaryCard icon={Wallet} title="Campaign Details" items={[
                ['Name', formData.name || '—'],
                ['Budget', formData.budget ? `$${formData.budget}` : '—'],
                ['Duration', formData.start_date && formData.end_date ? `${formData.start_date} → ${formData.end_date}` : '—'],
              ]} />
              <SummaryCard icon={MapPin} title="Ad Set" items={[
                ['Location', formData.location || '—'],
                ['Audience', formData.audience || '—'],
                ['Budget Split', formData.budget_split ? `$${formData.budget_split}` : '—'],
              ]} />
              <SummaryCard icon={ImagePlus} title="Creative" items={[
                ['Type', formData.creative_type || '—'],
                ['Headline', formData.headline || '—'],
                ['Media', formData.media_file_name || '—'],
              ]} />
              <SummaryCard icon={Target} title="Description" items={[[formData.description || 'No description provided yet.', '']]} />
            </div>
            <div className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Ready to submit</p>
              <p className="mt-3 text-sm leading-6 text-foreground/90">Submitting now will log the campaign, ad set, and ad payloads to the console so backend integration can be added later.</p>
              {submitted ? <p className="mt-4 rounded-2xl border border-cyan-400/20 bg-slate-950/30 px-4 py-3 text-sm text-cyan-200">Submitted successfully. Check the browser console for the payload.</p> : null}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">Complete each step to unlock the review stage.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="ghost" onClick={goBack} disabled={currentStep === 0}>Back</Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={goNext}>
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Campaign</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ label, error, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Wallet;
  title: string;
  items: Array<[string, string]>;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-neon">
          <Icon className="h-4 w-4" />
        </div>
        <p className="font-medium">{title}</p>
      </div>
      <div className="mt-4 space-y-3">
        {items.map(([label, value]) => (
          <div key={`${title}-${label}-${value}`} className="rounded-2xl border border-white/10 bg-slate-950/30 p-3">
            {value ? (
              <>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm leading-6 text-foreground/90">{value}</p>
              </>
            ) : (
              <p className="text-sm leading-6 text-foreground/90">{label}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
