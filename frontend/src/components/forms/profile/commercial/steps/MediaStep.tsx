import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image, Video } from 'lucide-react';

interface MediaStepProps {
  data: any;
  onNext: (data: any) => void;
}

const MediaStep = ({ data, onNext }: MediaStepProps) => {
  const [photos, setPhotos] = useState<string[]>(data.media?.photos || []);
  const [videos, setVideos] = useState<string[]>(data.media?.videos || []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulation d'upload - à remplacer par un vrai service
      const newPhotos = Array.from(files).map(() => '/placeholder.svg');
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulation d'upload
      const newVideos = Array.from(files).map(() => '/placeholder.svg');
      setVideos([...videos, ...newVideos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onNext({
      media: {
        photos,
        videos
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Photos et Médias</h2>
        <p className="text-gray-600 text-lg">
          Ajoutez des visuels attractifs pour présenter votre établissement
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Photos Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Image className="h-5 w-5" />
            Photos de votre établissement
          </Label>
          
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center bg-gradient-to-br from-purple-50 to-blue-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <p className="text-lg font-medium text-purple-700 mb-2">
                Cliquez pour ajouter des photos
              </p>
              <p className="text-sm text-gray-600">
                Formats acceptés: JPG, PNG, WebP (max 5MB par image)
              </p>
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                      Photo principale
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Video className="h-5 w-5" />
            Vidéos de présentation (optionnel)
          </Label>
          
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <p className="text-lg font-medium text-blue-700 mb-2">
                Cliquez pour ajouter des vidéos
              </p>
              <p className="text-sm text-gray-600">
                Formats acceptés: MP4, WebM (max 50MB par vidéo)
              </p>
            </label>
          </div>

          {videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((video, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <Video className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-blue-700 font-medium">Vidéo {index + 1}</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeVideo(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Conseils pour de bonnes photos :</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Prenez des photos en haute résolution et bien éclairées</li>
            <li>• Montrez l'extérieur, l'intérieur, l'ambiance et les détails</li>
            <li>• La première photo sera utilisée comme image principale</li>
            <li>• Évitez les photos floues ou mal cadrées</li>
          </ul>
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-12"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaStep;