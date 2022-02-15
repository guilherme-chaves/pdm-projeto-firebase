export default interface CardContentInterface {
    category: String,
    id: Number,
    title: String,
    imageUrl: String
}


export interface CategoryData {
    name: String,
    items: Array<CardContentInterface>
}