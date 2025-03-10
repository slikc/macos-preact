import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact';
import clsx from 'clsx';
import css from './Photos.module.scss';

type Photo = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const Photos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`);
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleBack = () => {
    setSelectedPhoto(null);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <section class={css.container}>
      <header class={clsx('app-window-drag-handle', css.titleBar)}>
        {selectedPhoto && (
          <button onClick={handleBack} class={css.backButton}>
            Back
          </button>
        )}
        <h1 class={css.title}>{selectedPhoto ? selectedPhoto.author : 'Photos'}</h1>
      </header>

      <section class={css.mainArea}>
        {error && (
          <div class={css.error}>
            <p>{error}</p>
            <button onClick={() => setPage(1)}>Try Again</button>
          </div>
        )}

        {loading && <div class={css.loading}>Loading photos...</div>}

        {!loading && !error && !selectedPhoto && (
          <div class={css.photoContent}>
            <div class={css.galleryControls}>
              <button onClick={handlePrevPage} disabled={page === 1}>
                Previous
              </button>
              <span>Page {page}</span>
              <button onClick={handleNextPage}>Next</button>
            </div>
            <div class={css.photoGrid}>
              {photos.map((photo) => (
                <div key={photo.id} class={css.photoItem} onClick={() => handlePhotoClick(photo)}>
                  <img
                    src={`https://picsum.photos/id/${photo.id}/200/200`}
                    alt={`Photo by ${photo.author}`}
                    loading="lazy"
                  />
                  <span class={css.photoAuthor}>{photo.author}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPhoto && (
          <div class={css.singlePhotoView}>
            <img
              src={`https://picsum.photos/id/${selectedPhoto.id}/${selectedPhoto.width}/${selectedPhoto.height}`}
              alt={`Photo by ${selectedPhoto.author}`}
              class={css.fullPhoto}
            />
            <div class={css.photoInfo}>
              <h2>{selectedPhoto.author}</h2>
              <p>
                Original Size: {selectedPhoto.width}x{selectedPhoto.height}
              </p>
              <a
                href={selectedPhoto.download_url}
                target="_blank"
                rel="noopener noreferrer"
                class={css.downloadLink}
              >
                View Original
              </a>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default Photos;
