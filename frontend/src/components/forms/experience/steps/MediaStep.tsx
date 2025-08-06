import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image, Video } from 'lucide-react';

interface MediaStepProps {
  data: {
    media?: {
      photos: string[];
      videos: string[];
    };
  };
  onNext: (data: any) => void;
}

const MediaStep = ({ data, onNext }: MediaStepProps) => {
  const [photos, setPhotos] = useState<string[]>(data.media?.photos || []);
  const [videos, setVideos] = useState<string[]>(data.media?.videos || []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulation d'upload - à remplacer par un vrai service de stockage
      const newPhotos = Array.from(files).map(() => '/placeholder.svg');
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulation d'upload - à remplacer par un vrai service de stockage
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Photos et Vidéos</h2>
        <p className="text-muted-foreground">
          Ajoutez des visuels pour rendre votre recommandation plus attractive (optionnel)
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Photos Section */}
        <div className="space-y-4">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Image className="h-4 w-4" />
            Photos
          </Label>
          
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Cliquez pour ajouter des photos ou glissez-déposez
              </p>
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div className="space-y-4">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Video className="h-4 w-4" />
            Vidéos
          </Label>
          
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Cliquez pour ajouter des vidéos ou glissez-déposez
              </p>
            </label>
          </div>

          {videos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((video, index) => (
                <div key={index} className="relative">
                  <div className="w-full h-20 bg-muted rounded-lg flex items-center justify-center">
                    <Video className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => removeVideo(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit} size="lg">
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaStep;