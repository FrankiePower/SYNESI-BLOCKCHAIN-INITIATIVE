import React from 'react';

const VideoEmbed = ({ videoId, className }: { videoId: string, className: string }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className={className}
      />
    </div>
  );
};

export default VideoEmbed;