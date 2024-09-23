import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-4 mt-8 text-cente w-full  ">
            <p className="text-gray-700">
                @{new Date().getFullYear()} Made with ❤️ by Dishant
            </p>
        </footer>
    );
};

export default Footer;
