import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useSettingsStore } from '@/stores/settingsStore';
import { CURRENCIES, LANGUAGES, COLOR_SCHEMES, DEFAULT_SETTINGS } from '@/lib/constants';
import { useUIStore } from '@/stores/uiStore';

export function SettingsPage() {
  const settings = useSettingsStore();
  const addToast = useUIStore((state) => state.addToast);
  const [currency, setCurrency] = useState(settings.currency);
  const [language, setLanguage] = useState(settings.language);
  const [colorScheme, setColorScheme] = useState(settings.colorScheme);
  const [defaultHourlyRate, setDefaultHourlyRate] = useState(settings.defaultHourlyRate.toString());
  const [taxRate, setTaxRate] = useState(settings.taxRate.toString());

  const handleSave = () => {
    settings.setSettings({
      currency,
      language,
      colorScheme,
      defaultHourlyRate: parseFloat(defaultHourlyRate) || DEFAULT_SETTINGS.defaultHourlyRate,
      taxRate: parseFloat(taxRate) || DEFAULT_SETTINGS.taxRate,
    });
    addToast({ title: 'Success', description: 'Settings saved', variant: 'success' });
  };

  return (
    <AppShell title="Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.symbol} {c.code} - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colorScheme">Color Scheme</Label>
              <Select value={colorScheme} onValueChange={(v: 'light' | 'dark' | 'system') => setColorScheme(v)}>
                <SelectTrigger id="colorScheme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_SCHEMES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Default Hourly Rate</Label>
              <Input
                id="hourlyRate"
                type="number"
                min="0"
                step="0.01"
                value={defaultHourlyRate}
                onChange={(e) => setDefaultHourlyRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This will be used as the default rate for new clients and projects.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Default tax rate applied to invoices.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground mb-2">
                Export all your data as a JSON file.
              </p>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium">Reset Data</p>
              <p className="text-sm text-muted-foreground mb-2">
                Delete all data and start fresh. This action cannot be undone.
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to delete all data? This cannot be undone.')) {
                    addToast({ title: 'Data reset', description: 'All data has been cleared', variant: 'success' });
                  }
                }}
              >
                Reset All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </AppShell>
  );
}
