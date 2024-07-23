import { FlipWords } from '../ui/flip-words';

export default function PromotionHeader() {
    const words = ["keyboard", "experience"];

    return (
        <div className="flex justify-center items-center px-4">
            <div className="text-5xl flex flex-col gap-3 mx-auto text-nowrap font-normal text-neutral-600 dark:text-neutral-400 tracking-normal">
                <div>
                    Build your dream<FlipWords className='text-pink-500' duration={1000} words={words} />
                </div>
                <div>with KeebsMart</div>
            </div>
        </div>
    )
}