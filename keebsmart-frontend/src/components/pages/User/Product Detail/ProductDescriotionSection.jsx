export default function ProductDescriptionSection({ product, specs }) {
    return (
        <div className="mt-5">
            {/* Accordion container for collapsing sections */}
            <div id="accordion-collapse" data-accordion="collapse">
                
                {/* Description section header */}
                <h2 id="accordion-collapse-heading-1">
                    <button
                        type="button"
                        className="
                            flex items-center border-b-2 justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border-gray-200 
                            focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 
                            dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        "
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-1"
                    >
                        {/* Button label for the description section */}
                        <span>Description</span>
                        {/* Arrow icon indicating the expandable state */}
                        <svg
                            data-accordion-icon
                            className="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                
                {/* Description section content */}
                <div
                    id="accordion-collapse-body-1"
                    className="hidden"
                    aria-labelledby="accordion-collapse-heading-1"
                >
                    <div className="
                        p-5 border border-b-0 border-gray-200 
                        dark:border-gray-700 dark:bg-gray-900
                    ">
                        {/* Product description */}
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {product.description}
                        </p>
                    </div>
                </div>
                
                {/* Specs section header */}
                <h2 id="accordion-collapse-heading-2">
                    <button
                        type="button"
                        className="
                            flex items-center border-b-2 justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border-gray-200 
                            focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 
                            dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
                        "
                        data-accordion-target="#accordion-collapse-body-2"
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-2"
                    >
                        {/* Button label for the specs section */}
                        <span>Specs</span>
                        {/* Arrow icon indicating the expandable state */}
                        <svg
                            data-accordion-icon
                            className="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                
                {/* Specs section content */}
                <div
                    id="accordion-collapse-body-2"
                    className="hidden"
                    aria-labelledby="accordion-collapse-heading-2"
                >
                    <div className="
                        p-5 border border-b-0 border-gray-200 
                        dark:border-gray-700 dark:bg-gray-900
                    ">
                        {/* List of product specifications */}
                        <ul className="list-disc p-3">
                            {specs.map((item, key) => (
                                <li key={key} className="my-3">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>  
        </div>
    )
}
