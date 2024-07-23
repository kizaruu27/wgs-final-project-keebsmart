import { InfiniteMovingCards } from "../ui/infinite-moving-cards"

export default function HomePageWhyUs() {
    const items = [
        {
            quote: 'All orders are packaged with 💜 and shipped from the Keebsmart warehouse in Bandung.',
            color: 'purple-500',
        },
        {
            quote: 'We ship most orders within 24-48 hours and accept returns within 14 days of receipt.',
            color: 'blue-500',
        },
        {
            quote: 'Multiple payment options available at checkout, and interest-free payment plans are available.',
            color: 'green-500',
        },
        {
            quote: 'Create your dream mechanical keyboard from scratch or customize existing ones.',
            color: 'pink-500',
        },
    ];

    return (
        <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards items={items} direction="right" speed="slow" pauseOnHover={false}/>
        </div>
    )
}