export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price?: string;
    category?: string[];
    dietaryTags: string[];
    generatedImageUrl?: string;
    imageStatus: 'idle' | 'loading' | 'success' | 'error';
}

export enum AppState {
    HOME = 'HOME',
    PROCESSING_MENU = 'PROCESSING_MENU',
    MENU_VIEW = 'MENU_VIEW'
}