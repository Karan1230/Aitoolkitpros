export interface VideoDetails {
    id: string;
    title: string;
    description: string;
    tags: string[];
    viewCount: number;
    likeCount: number;
    commentCount: number;
    thumbnailUrl: string;
}

export interface ChannelDetails {
    id: string;
    title: string;
    description: string;
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
    thumbnailUrl: string;
}

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

async function fetchYouTubeAPI(endpoint: string, params: Record<string, string>) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append('key', API_KEY!);
    for (const key in params) {
        url.searchParams.append(key, params[key]);
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error:', errorData);
        throw new Error(`YouTube API request failed: ${errorData.error.message}`);
    }
    return response.json();
}

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
    const data = await fetchYouTubeAPI('videos', {
        part: 'snippet,statistics',
        id: videoId,
    });
    if (!data.items || data.items.length === 0) {
        throw new Error('Video not found.');
    }
    const item = data.items[0];
    return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        tags: item.snippet.tags || [],
        viewCount: parseInt(item.statistics.viewCount, 10),
        likeCount: parseInt(item.statistics.likeCount, 10),
        commentCount: parseInt(item.statistics.commentCount, 10),
        thumbnailUrl: item.snippet.thumbnails.high.url,
    };
}

export async function getChannelDetails(channelId: string): Promise<ChannelDetails> {
    const data = await fetchYouTubeAPI('channels', {
        part: 'snippet,statistics',
        id: channelId,
    });
    if (!data.items || data.items.length === 0) {
        throw new Error('Channel not found.');
    }
    const item = data.items[0];
    return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        subscriberCount: parseInt(item.statistics.subscriberCount, 10),
        viewCount: parseInt(item.statistics.viewCount, 10),
        videoCount: parseInt(item.statistics.videoCount, 10),
        thumbnailUrl: item.snippet.thumbnails.high.url,
    };
}

export async function searchVideosByKeyword(keyword: string): Promise<VideoDetails[]> {
    const data = await fetchYouTubeAPI('search', {
        part: 'snippet',
        q: keyword,
        type: 'video',
        maxResults: '10',
    });

    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    if (!videoIds) return [];

    return (await Promise.all(data.items.map((item: any) => getVideoDetails(item.id.videoId).catch(e => null))))
           .filter((v): v is VideoDetails => v !== null);
}

export function extractKeywords(videos: VideoDetails[]): string[] {
    const keywordSet = new Set<string>();
    videos.forEach(video => {
        video.tags.forEach(tag => keywordSet.add(tag.toLowerCase()));
        video.title.split(/\s+/).forEach(word => {
            if (word.length > 3) keywordSet.add(word.toLowerCase());
        });
    });
    return Array.from(keywordSet);
}
