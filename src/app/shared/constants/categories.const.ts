import { Category } from "../models/category.model";

const EX = 'expense';
const IN = 'income';

export const CATEGORY_INCOME: Category[] = [
    {
        _pid: 1,
        type: IN,
        name: 'Salary',
        icon: 'bi bi-cash',
        isPredefined: true
    }
]

export const CATEGORY_EXPENSES: Category[] = [
    {
        _pid: 11,
        type: EX,
        name: 'Housing',
        icon: 'bi bi-house',
        isPredefined: true
    },
    {
        _pid: 12,
        type: EX,
        name: 'Electric Bill',
        icon: 'bi bi-lightning',
        isPredefined: true
    },
    {
        _pid: 13,
        type: EX,
        name: 'Water Bill',
        icon: 'bi bi-droplet',
        isPredefined: true
    },
    {
        _pid: 14,
        type: EX,
        name: 'Internet Bill',
        icon: 'bi bi-router',
        isPredefined: true
    },
    {
        _pid: 15,
        type: EX,
        name: 'Phone Bill',
        icon: 'bi bi-telephone',
        isPredefined: true
    },
    {
        _pid: 16,
        type: EX,
        name: 'Car',
        icon: 'bi bi-car-front',
        isPredefined: true
    },
    {
        _pid: 17,
        type: EX,
        name: 'Public Transpo',
        icon: 'bi bi-train-front',
        isPredefined: true
    },
    {
        _pid: 18,
        type: EX,
        name: 'Groceries',
        icon: 'bi bi-cart4',
        isPredefined: true
    },
    {
        _pid: 19,
        type: EX,
        name: 'Shopping',
        icon: 'bi bi-bag',
        isPredefined: true
    },
    {
        _pid: 20,
        type: EX,
        name: 'Cable, Streaming Services',
        icon: 'bi bi-tv',
        isPredefined: true
    },
    {
        _pid: 21,
        type: EX,
        name: 'Debt Payments',
        icon: 'bi bi-credit-card',
        isPredefined: true
    },
    {
        _pid: 22,
        type: EX,
        name: 'Membership, Subscriptions',
        icon: 'bi bi-people',
        isPredefined: true
    },
    {
        _pid: 23,
        type: EX,
        name: 'Child Care',
        icon: 'bi bi-calendar-heart',
        isPredefined: true
    },
    {
        _pid: 24,
        type: EX,
        name: 'Health Care',
        icon: 'bi bi-bandaid',
        isPredefined: true
    },
    {
        _pid: 25,
        type: EX,
        name: 'Emergeny Fund',
        icon: 'bi bi-hospital',
        isPredefined: true
    },
    {
        _pid: 26,
        type: EX,
        name: 'Retirement',
        icon: 'bi bi-person',
        isPredefined: true
    },
    {
        _pid: 27,
        type: EX,
        name: 'Travel',
        icon: 'bi bi-airplane',
        isPredefined: true
    },
    {
        _pid: 28,
        type: EX,
        name: 'Others',
        icon: 'bi bi-three-dots',
        isPredefined: true
    }
]