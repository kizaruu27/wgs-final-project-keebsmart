export default function SetQtyButton({onDecrease, qty, onIncrease}) {
    return (
        <div className="bg-gray-100 rounded-full w-28 p-2 text-xl font-normal flex gap-3 justify-center">
            <button onClick={onDecrease}>-</button>
            {qty}
            <button onClick={onIncrease}>+</button>
        </div>
    )
}