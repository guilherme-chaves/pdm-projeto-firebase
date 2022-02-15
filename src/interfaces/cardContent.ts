export default interface CardContentInterface {
    category: string,
    id: number,
    title: string,
    imageUrl: string
}


export interface CategoryData {
    name: string,
    items: Array<CardContentInterface>
}