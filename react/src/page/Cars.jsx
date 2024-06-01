import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import fetchCars from '../services/FetchCars';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function Cars() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const location = useLocation();

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [marques, setMarques] = useState([]);
    const [prix, setPrix] = useState([]);
    const [couleurs, setCouleurs] = useState([]);
    const [marqueFilter, setMarqueFilter] = useState('');
    const [prixFilter, setPrixFilter] = useState('');
    const [couleurFilter, setCouleurFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    console.log(couleurs);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonData = await fetchCars(baseUrl);
                setData(jsonData);
                setFilteredData(jsonData);
                setIsLoading(false);
                const uniqueMarques = Array.from(new Set(jsonData.map(item => item.marque)));
                const uniquePrix = Array.from(new Set(jsonData.map(item => parseFloat(item.prix))));
                const uniqueCouleurs = Array.from(new Set(jsonData.map(item => item.couleur)));

                setMarques(uniqueMarques);
                setPrix(uniquePrix);
                setCouleurs(uniqueCouleurs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [baseUrl]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const variable = params.get('marque');
        if (variable) {
            setMarqueFilter(variable);
        } else {
            setMarqueFilter('');
        }
    }, [location.search]);

    useEffect(() => {
        filterData();
    }, [marqueFilter, prixFilter, couleurFilter, currentPage, data]);

    const filterData = () => {
        let filtered = [...data];

        if (marqueFilter) {
            filtered = filtered.filter(car => car.marque === marqueFilter);
        }

        if (prixFilter) {
            filtered = filtered.filter(car => parseFloat(car.prix) === parseFloat(prixFilter));
        }

        if (couleurFilter) {
            filtered = filtered.filter(car => car.couleur === couleurFilter);
        }

        setFilteredData(filtered);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastCar = currentPage * dataPerPage;
    const indexOfFirstCar = indexOfLastCar - dataPerPage;
    const currentCars = filteredData.slice(indexOfFirstCar, indexOfLastCar);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / dataPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderSkeleton = () => {
        return Array(dataPerPage).fill().map((_, index) => (
            <div key={index} className="bg-gray p-4 rounded-md shadow-md my-1 flex flex-col justify-between">
                <Skeleton height={200} />
                <Skeleton count={3} />
            </div>
        ));
    };

    return (
        <div style={{ minHeight: "70vh" }} className="container mx-auto mt-20">
            <div className="flex mb-4">
                <div className="row w-full">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <Listbox value={marqueFilter} onChange={setMarqueFilter}>
                            {({ open }) => (
                                <>
                                    <Label className="block text-sm font-medium leading-6 text-gray-900">Filter by Brand</Label>
                                    <div className="relative mt-2">
                                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className="block truncate">{marqueFilter || "Select a brand"}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-sky-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value=""
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                None
                                                            </span>
                                                            {selected ? (
                                                                <span className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}>
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </ListboxOption>
                                                {marques.map((marque, idx) => (
                                                    <ListboxOption
                                                        key={idx}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-sky-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={marque}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {marque}
                                                                </span>
                                                                {selected ? (
                                                                    <span className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}>
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <Listbox value={prixFilter} onChange={setPrixFilter}>
                            {({ open }) => (
                                <>
                                    <Label className="block text-sm font-medium leading-6 text-gray-900">Filter by Price</Label>
                                    <div className="relative mt-2">
                                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className="block truncate">{prixFilter ? `${prixFilter}DH` : "Select a price"}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-sky-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value=""
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                None
                                                            </span>
                                                            {selected ? (
                                                                <span className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}>
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </ListboxOption>
                                                {prix.map((p, idx) => (
                                                    <ListboxOption
                                                        key={idx}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-sky-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={p}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {p}DH
                                                                </span>
                                                                {selected ? (
                                                                    <span className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}>
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <Listbox value={couleurFilter} onChange={setCouleurFilter}>
                            {({ open }) => (
                                <>
                                    <Label className="block text-sm font-medium leading-6 text-gray-900">Filter by Color</Label>
                                    <div className="relative mt-2">
                                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className="block truncate">{couleurFilter || "Select a color"}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>
                                        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                <ListboxOption
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-sky-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value=""
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                None
                                                            </span>
                                                            {selected ? (
                                                                <span className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}>
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </ListboxOption>
                                                {couleurs.map((couleur, idx) => (
                                                    <ListboxOption
                                                        key={idx}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-sky-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={couleur}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {couleur}
                                                                </span>
                                                                {selected ? (
                                                                    <span className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}>
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                </div>
            </div>
            <div>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-2">
                        {renderSkeleton()}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-2">
                        {currentCars.length > 0 ? (
                            currentCars.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-md shadow-md my-1 flex flex-col justify-between">
                                    <Link to={`/carDetails/${item.id}`}>
                                        <div>
                                            <img src={item.image} alt="Car" className="mb-2 transition-transform duration-300 transform hover:scale-110" />
                                            <h1 className="text-xl font-bold mb-2">{item.marque} {item.model.nom_model}</h1>
                                            <p className="text-gray-700">Num Matricule: {item.num_matricule}</p>
                                            <p className="text-gray-700">Price: {item.prix}DH/Day</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: "center" }} className='text-2xl'>No cars match the selected filters.</p>
                        )}
                    </div>
                )}
            </div>
            <nav className='flex justify-center mb-3'>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
