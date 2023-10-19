export interface Record {
    categoryName: string,
    categoryType: string,
    categoryId?: string
    description: string,
    amount: number,
    transactionDate: Date | string,
    balance?: number,
    createdOn?: Date | string,
    isDeleted?: boolean,
    icon?: string
}