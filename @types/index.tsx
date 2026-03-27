type Language = {
    id: number
    name: string
    flag: any
}
interface MenuButtonType {
    title: string;
    href?: string;
    extraClass?: string
}
type Meal = {
    id: string  // number emas, string
    name: string
    description: string
    price: number
    image: string
    category: {
        id: string
        categoryName: string
    }
}

type MealCardProps = {
    meal: Meal
    featured?: boolean,
    extraClass?: string
}


type CustomInputType = {
    type: "text" | "password" | "email" | "tel"
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}


interface Category {
    id: string
    categoryName: string
}

interface Menu {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: {
        id: string
        categoryName: string
    }
}

type NewsType = {
    id: string
    title: string
    about: string
    image: string
    author: string
    authorImage: string
    createdAt: string
}

type TeamType = {
    id: string
    fullName: string
    position: string
    image: string
    createdAt: string
}

type CartItem = {
    id: string
    name: string
    image: string
    price: number | string
    count: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'count'>) => void
    removeItem: (id: string) => void
    updateCount: (id: string, count: number) => void
    totalCount: number
    totalPrice: number
}

type PaginationProps = {
    total: number
    current: number
    onChange: (page: number) => void
    siblings?: number
}


type GalleryType = {
    id: string
    image: string
}


type HeroMenuProps = {
    menus: Menu[]
    categories: Category[]
}

