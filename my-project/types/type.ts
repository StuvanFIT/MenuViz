export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price?: string;
    category?: string;
    dietaryTags: string;
    generatedImageUrl?: string;
    imageStatus: 'idle' | 'loading' | 'success' | 'error';
}