export default interface CardContentInterface {
    category: string,
    id: string,
    title: string,
    imageUrl: string
}


export interface CategoryData {
    name: string,
    items: Array<CardContentInterface>
}

export interface ItemClosetInterface {
    category: string,
    id: string,
    title: string,
    imageUrl: string,
    boughtValue: number,
    sellValue: number,
    description: string
}