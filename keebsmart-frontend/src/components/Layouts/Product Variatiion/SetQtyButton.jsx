export default function SetQtyButton({ onDecrease, qty, onIncrease }) {
    return (
        <div className="bg-gray-100 rounded-full w-28 p-2 text-xl font-normal flex gap-3 justify-center">
            {/* Button to decrease the quantity */}
            <button onClick={onDecrease}>
                -
            </button>
            {/* Display the current quantity */}
            {qty}
            {/* Button to increase the quantity */}
            <button onClick={onIncrease}>
                +
            </button>
        </div>
    )
}
