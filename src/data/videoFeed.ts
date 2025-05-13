
export interface VideoItem {
  id: string;
  url: string;
  type: 'video' | 'image';
}

const videoFeed: VideoItem[] = [
  {
    id: 'video-3',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-05-08.mp4',
    type: 'video'
  },
  {
    id: 'video-4',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-05-10.mp4',
    type: 'video'
  },
  {
    id: 'video-5',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-05-13.mp4',
    type: 'video'
  },
  {
    id: 'video-6',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-05-16.mp4',
    type: 'video'
  },
  {
    id: 'video-7',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-04-52.mp4',
    type: 'video'
  },
  {
    id: 'video-8',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-04-58.mp4',
    type: 'video'
  },
  {
    id: 'video-9',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-05-03.mp4',
    type: 'video'
  },
  {
    id: 'video-10',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-05-05.mp4',
    type: 'video'
  },
  {
    id: 'video-11',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-04-45.mp4',
    type: 'video'
  },
  {
    id: 'video-12',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/video_2025-05-13_09-04-49.mp4',
    type: 'video'
  },
  {
    id: 'image-1',
    url: 'https://tikroom.net/wp-content/uploads/2025/05/ChatGPT-Image-13-mai-2025-09_03_31.png',
    type: 'image'
  }
];

export default videoFeed;
