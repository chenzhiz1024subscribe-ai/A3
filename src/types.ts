export type T3DModel = {
    path: string;
    speed: number;
    duration: number;
    x: number;
    y: number;
    z: number;
    scale: number;
};

export type TMovie = {
    year: string;
    genre: string;
    title?: string;
    rating?: number;
};

export type TStackRow = {
    year: string | number;
    [key: string]: string | number;
};