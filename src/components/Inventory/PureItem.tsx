interface PureItemProps {
    imgsrc: string;
    description: string;
    amount: number;
    price: number;
}

export function PureItem({ imgsrc, description, amount, price }: PureItemProps) {
    console.log(price)
    return (
        <div className="flex-1 line-clamp-3 relative h-full content-center">
            <img src={imgsrc} alt={description} className='m-auto' />
            <sup className='text-amber-700 outline-shadow-gray-50 block p-1 text-xs font-medium w-full text-end absolute'>{amount}</sup>
        </div>

    )
}

