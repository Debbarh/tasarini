import { useState } from 'react';
import { Settings, Palette, Globe, Mail, Shield, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const PlatformSettings = () => {
  const [settings, setSettings] = useState({
    // Paramètres généraux
    siteName: 'TASARINI',
    siteDescription: 'Plateforme de recommandations de voyage',
    maintenanceMode: false,
    
    // Paramètres d'apparence
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    logoUrl: '',
    faviconUrl: '',
    
    // Paramètres de localisation
    defaultLanguage: 'fr',
    timezone: 'Europe/Paris',
    currency: 'EUR',
    
    // Paramètres de notification
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    
    // Paramètres de contenu
    autoModeration: false,
    requireApproval: true,
    maxPhotoUpload: 10,
    
    // Paramètres de sécurité
    twoFactorAuth: false,
    sessionTimeout: 24,
    passwordMinLength: 8,
    
    // Réseaux sociaux
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: ''
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Ici on sauvegarderait les paramètres
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres de la plateforme ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Paramètres de la Plateforme
        </h2>
        <p className="text-gray-600">Configurez et personnalisez votre plateforme TASARINI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Paramètres Généraux */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Paramètres Généraux
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nom du site</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode">Mode maintenance</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Paramètres d'Apparence */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apparence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Couleur principale</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  placeholder="#6366f1"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Couleur secondaire</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  placeholder="#8b5cf6"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">URL du logo</Label>
              <Input
                id="logoUrl"
                value={settings.logoUrl}
                onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de Localisation */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Localisation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Langue par défaut</Label>
              <select
                id="defaultLanguage"
                value={settings.defaultLanguage}
                onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Europe/Paris">Europe/Paris</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dollar US ($)</option>
                <option value="GBP">Livre Sterling (£)</option>
                <option value="JPY">Yen (¥)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de Notification */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Notifications email</Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications">Notifications push</Label>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="weeklyDigest">Digest hebdomadaire</Label>
              <Switch
                id="weeklyDigest"
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de Contenu */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Modération du Contenu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoModeration">Modération automatique</Label>
              <Switch
                id="autoModeration"
                checked={settings.autoModeration}
                onCheckedChange={(checked) => handleSettingChange('autoModeration', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="requireApproval">Approbation requise</Label>
              <Switch
                id="requireApproval"
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPhotoUpload">Photos max par publication</Label>
              <Input
                id="maxPhotoUpload"
                type="number"
                value={settings.maxPhotoUpload}
                onChange={(e) => handleSettingChange('maxPhotoUpload', parseInt(e.target.value))}
                min="1"
                max="20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Réseaux Sociaux */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Réseaux Sociaux
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook</Label>
              <Input
                id="facebookUrl"
                value={settings.facebookUrl}
                onChange={(e) => handleSettingChange('facebookUrl', e.target.value)}
                placeholder="https://facebook.com/tasarini"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterUrl">Twitter</Label>
              <Input
                id="twitterUrl"
                value={settings.twitterUrl}
                onChange={(e) => handleSettingChange('twitterUrl', e.target.value)}
                placeholder="https://twitter.com/tasarini"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram</Label>
              <Input
                id="instagramUrl"
                value={settings.instagramUrl}
                onChange={(e) => handleSettingChange('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/tasarini"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Save className="h-4 w-4" />
          Sauvegarder les paramètres
        </Button>
      </div>
    </div>
  );
};

export default PlatformSettings;