import { FacebookIcon } from "../svg/Facebook";
import { LinkedInIcon } from "../svg/Linkedin";
import { TwitterIcon } from "../svg/Twitter";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-4">
            <div className="max-w-7xl mx-auto px-6">
                <h4>Job Hunters</h4>
                <div className="flex items-center justify-between mt-3">
                    <p>© {new Date().getFullYear()} your company, All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white text-xl transition">
                            <LinkedInIcon />
                        </a>
                        <a href="#" className="hover:text-white text-xl transition">
                            <TwitterIcon />
                        </a>
                        <a href="#" className="hover:text-white text-xl transition">
                            <FacebookIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};