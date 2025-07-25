import React, { useEffect } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    // useEffect(() => {
    //     if (!window.chatbase || window.chatbase("getState") !== "initialized") {
    //         window.chatbase = (...args) => {
    //             if (!window.chatbase.q) {
    //                 window.chatbase.q = [];
    //             }
    //             window.chatbase.q.push(args);
    //         };
    //         window.chatbase = new Proxy(window.chatbase, {
    //             get(target, prop) {
    //                 if (prop === "q") {
    //                     return target.q;
    //                 }
    //                 return (...args) => target(prop, ...args);
    //             },
    //         });
    //     }

    //     const onLoad = function () {
    //         const script = document.createElement("script");
    //         script.src = "https://www.chatbase.co/embed.min.js";
    //         script.id = "ozpaIILcImUUuyJchRZwN";
    //         script.domain = "www.chatbase.co";
    //         document.body.appendChild(script);
    //     };

    //     if (document.readyState === "complete") {
    //         onLoad();
    //     } else {
    //         window.addEventListener("load", onLoad);
    //     }

    //     return () => {
    //         const existingScript = document.getElementById("ozpaIILcImUUuyJchRZwN");
    //         if (existingScript) {
    //             existingScript.remove();
    //         }

    //         const chatIframe = document.querySelector("iframe[src*='chatbase.co']");
    //         if (chatIframe) { 
    //             chatIframe.remove();
    //         }
    //     };
    // }, []);

    const [hasDates, setHasDates] = React.useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const dateList = document.querySelector(".selected-dates");
            setHasDates(dateList && dateList.children.length > 0);
        });
        const dateList = document.querySelector(".selected-dates");
        if (dateList) {
            observer.observe(dateList, { childList: true });
            setHasDates(dateList.children.length > 0);
        }
        return () => observer.disconnect();
    }, []);

    // State for form fields
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        consumption: "",
        panelLocation: "",
        battery: false,
        dates: [],
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle radio button change
    const handleRadioChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            panelLocation: e.target.value,
        }));
    };

    // Handle date selection
    const handleDateChange = (e) => {
        const date = e.target.value;
        if (date && !formData.dates.includes(date)) {
            setFormData((prev) => ({
                ...prev,
                dates: [...prev.dates, date],
            }));
        }
    };

    // Remove date from selected dates
    const handleRemoveDate = (date) => {
        setFormData((prev) => ({
            ...prev,
            dates: prev.dates.filter((d) => d !== date),
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the form submission here (e.g., send data to backend)
        // For now, just log the formData
        console.log(formData);
    };

    return (
        <>
            <div className="contact-us">
                <nav className="navbar">
                    <ul>
                        <li>
                            <img id='image-logo' src="/src/assets/logo.png" alt="Logo" />
                    </li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sazinies ar mums</a></li>
                </ul>
            </nav>

            <header className='p-8 pt-20 pb-20 bg-zinc-800'>
                <h1>Sazinies ar mums</h1>
            </header>

            <div className="contact-content p-5">
                <form 
                className="contact-form grid grid-cols-1 md:grid-cols-2 size-full justify-between content-center" 
                action={"/"} 
                method="POST"       
                onSubmit={handleSubmit}
                >
                    <div className='chatbase-iframe size-auto flex justify-center p-5 min-h-120'>
                        <iframe className='h-full w-full !rounded-xl'
                            src="https://www.chatbase.co/chatbot-iframe/ozpaIILcImUUuyJchRZwN"
                        ></iframe>
                    </div>

                    <div className='form-group space-y-5 p-8 m-5 bg-white rounded-lg shadow-lg'>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Vārds uzvārds"
                                required
                                value={formData.fullname}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                            />
                            <span className="text-red-500 absolute top-0 right-2 text-lg">*</span>
                        </div>
                        
                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Tālrunis"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                            />
                            <span className="text-red-500 absolute top-0 right-2 text-lg">*</span>
                        </div>
                        
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-pasts"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                            />
                            <span className="text-red-500 absolute top-0 right-2 text-lg">*</span>
                        </div>
                        
                        <div className="relative">
                            <input
                                type="text"
                                name="address"
                                placeholder="Adrese"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                            />
                            <span className="text-red-500 absolute top-0 right-2 text-lg">*</span>
                        </div>
                        
                        <input
                            type="text"
                            name="consumption"
                            placeholder="Elektrības patēriņš gadā"
                            value={formData.consumption}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                        />

                        <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h4 className="font-medium mb-3 text-gray-800">Saules paņeļus vēlos uzstādīt:</h4>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <label className="flex items-center p-3 rounded-md border border-gray-200 bg-white cursor-pointer hover:border-green-500 transition-colors">
                                    <input
                                        type="radio"
                                        name="panelLocation"
                                        value="Jumts"
                                        checked={formData.panelLocation === "Jumts"}
                                        onChange={handleRadioChange}
                                        className="h-5 w-5 text-green-600 focus:ring-green-500 mr-3"
                                    />
                                    <div>
                                        <span className="text-gray-800 font-medium">Jumts</span>
                                        <p className="text-gray-500 text-sm mt-1">Uzstādīšana uz ēkas jumta</p>
                                    </div>
                                </label>
                                <label className="flex items-center p-3 rounded-md border border-gray-200 bg-white cursor-pointer hover:border-green-500 transition-colors">
                                    <input
                                        type="radio"
                                        name="panelLocation"
                                        value="Zeme"
                                        checked={formData.panelLocation === "Zeme"}
                                        onChange={handleRadioChange}
                                        className="h-5 w-5 text-green-600 focus:ring-green-500 mr-3"
                                    />
                                    <div>
                                        <span className="text-gray-800 font-medium">Zeme</span>
                                        <p className="text-gray-500 text-sm mt-1">Uzstādīšana uz zemes</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="flex items-center space-x-2 cursor-pointer text-gray-700">
                                <span className="text-gray-800">Plānoju risinājumā iekļaut akumulatoru</span>
                                <input
                                    type="checkbox"
                                    name="battery"
                                    checked={formData.battery}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-green-600 focus:ring-green-500 rounded"
                                />
                            </label>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium mb-3 text-gray-800">Izvēlieties Jums pieejamos vizītes datumus:</h4>
                            <input
                                type="date"
                                onChange={handleDateChange}
                                value=""
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                            />
                            <ul className="selected-dates mt-3 space-y-2">
                                {formData.dates.map((date) => (
                                    <li className="selected-date flex justify-between items-center bg-gray-100 px-4 py-2 rounded" key={date}>
                                        <span className="date-text text-gray-800">{date}</span>
                                        <button
                                            type="button"
                                            className="remove-icon text-red-500 hover:text-red-700"
                                            onClick={() => handleRemoveDate(date)}
                                        >
                                            ✖
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {hasDates && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Noklikšķiniet uz ✖, lai noņemtu datumu.
                                </p>
                            )}
                        </div>

                        <button 
                            type="submit"
                            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition-colors text-lg shadow-md"
                        >
                            Nosūtīt pieteikumu
                        </button>
                    </div>


                </form>

                <p className="text-center font-medium text-lg md:text-xl mt-6 mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded shadow-sm">
  Pēc pieteikuma nosūtīšanas ar Jums sazināsies pārstāvis darba dienas laikā!
</p>

            </div>

            <footer className="footer !bg-zinc-800">
                <div className="footer-content p-5">
                    <div className="footer-logo max-w-1/3">
                        <img id='image-logo' src="/src/assets/logo.png" alt="Logo" />
                        <p className='text-left pt-5'>Mūsu komanda nodrošina visus izstrādes posmus - sākot no idejas un koncepcijas izstrādes līdz realizācijai!</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">Facebook</a>
                            <a href="#" className="social-icon">Instagram</a>
                            <a href="#" className="social-icon">LinkedIn</a>
                        </div>
                    </div>
                    <div className="footer-contact">
                        <h3>Zvaniet</h3>
                        <p>+371 25761456</p>
                        <h3>Rakstiet</h3>
                        <p>info@sigsolar.lv</p>
                    </div>
                    <div className="footer-address">
                        <h3>Apmeklējums</h3>
                        <p>Latvija, Mārupe, Ziemciešu iela 3-2</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 SIG | SIG SOLAR.</p>
                </div>
            </footer>
        </div>
    </>
    );
};

export default ContactUs;
