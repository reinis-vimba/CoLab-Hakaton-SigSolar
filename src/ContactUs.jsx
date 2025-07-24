import React, { useEffect } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    useEffect(() => {
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args) => {
                if (!window.chatbase.q) {
                    window.chatbase.q = [];
                }
                window.chatbase.q.push(args);
            };
            window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                    if (prop === "q") {
                        return target.q;
                    }
                    return (...args) => target(prop, ...args);
                },
            });
        }

        const onLoad = function () {
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "ozpaIILcImUUuyJchRZwN";
            script.domain = "www.chatbase.co";
            document.body.appendChild(script);
        };

        if (document.readyState === "complete") {
            onLoad();
        } else {
            window.addEventListener("load", onLoad);
        }

        return () => {
            const existingScript = document.getElementById("ozpaIILcImUUuyJchRZwN");
            if (existingScript) {
                existingScript.remove();
            }

            const chatIframe = document.querySelector("iframe[src*='chatbase.co']");
            if (chatIframe) { 
                chatIframe.remove();
            }
        };
    }, []);

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
                            <img id='image-logo' src="/CoLab-Hakaton-SigSolar/src/assets/logo.png" alt="Logo" />
                    </li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sazinies ar mums</a></li>
                </ul>
            </nav>

            <header>
                <h1>Sazinies ar mums</h1>
            </header>

            <div className="contact-content">
                <form className="contact-form" action={"/"} method="POST" onSubmit={handleSubmit}>
                    <div style={{width: "98%"}}><input
                        type="text"
                        name="fullname"
                        placeholder="Vārds uzvārds"
                        required
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    <span className="required" style={{color: "red"}}>*</span></div>
                    <div style={{width: "98%"}}>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Tālrunis"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <span className="required" style={{color: "red"}}>*</span></div>
                    <div style={{width: "98%"}}>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-pasts"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span className="required" style={{color: "red"}}>*</span></div>
                    <div style={{width: "98%"}}>
                    <input
                        type="text"
                        name="address"
                        placeholder="Adrese"
                        required
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <span className="required" style={{color: "red"}}>*</span></div>
                    <input
                        type="text"
                        name="consumption"
                        placeholder="Elektrības patēriņš gadā"
                        value={formData.consumption}
                        onChange={handleChange}
                    />

                    <h4 style={{margin: 0}}>Saules paņeļus vēlos uzstādīt:</h4>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="panelLocation"
                                value="Jumts"
                                checked={formData.panelLocation === "Jumts"}
                                onChange={handleRadioChange}
                            />
                            <span>Jumts</span>
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="panelLocation"
                                value="Zeme"
                                checked={formData.panelLocation === "Zeme"}
                                onChange={handleRadioChange}
                            />
                            <span>Zeme</span>
                        </label>
                    </div>

                    <div className="checkbox-group">
                        <label style={{display: "flex"}}>
                            Plānoju risinājumā iekļaut akumulatoru
                            <input
                                style={{width: "25px"}}
                                type="checkbox"
                                name="battery"
                                checked={formData.battery}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="date-selection">
                        <h4>Izvēlieties Jums pieejamos vizītes datumus:</h4>
                        <input
                            type="date"
                            onChange={handleDateChange}
                            value=""
                        />
                        <ul className="selected-dates">
                            {formData.dates.map((date) => (
                                <li className="selected-date" key={date}>
                                    <span className="date-text">{date}</span>
                                    <span
                                        className="remove-icon"
                                        style={{cursor: "pointer"}}
                                        onClick={() => handleRemoveDate(date)}
                                    >
                                        ✖
                                    </span>
                                </li>
                            ))}
                        </ul>
                        {hasDates && (
                            <p style={{ fontSize: "0.9em", color: "#555" }}>
                                Noklikšķiniet uz ✖, lai noņemtu datumu.
                            </p>
                        )}
                    </div>

                    <button type="submit">Nosūtīt pieteikumu</button>
                </form>

                <p>Pēc pieteikuma nosūtīšanas ar Jums sazināsies pārstāvis darba dienas laikā!</p>

            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img id='image-logo' src="/CoLab-Hakaton-SigSolar/src/assets/logo.png" alt="Logo" />
                        <p>Mūsu komanda nodrošina visus izstrādes posmus - sākot no idejas un koncepcijas izstrādes līdz realizācijai!</p>
                        <div className="social-icons">
                            <a href="#" className="social-icon">Facebook</a>
                            <a href="#" className="social-icon">Instagram</a>
                            <a href="#" className="social-icon">LinkedIn</a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h3>Noderīgas saites</h3>
                        <a href="#">Saules paneļi</a>
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
