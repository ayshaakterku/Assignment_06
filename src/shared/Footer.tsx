import Image from 'next/image';
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <div className='w-full bg-[#15171D]'>
            <footer className="container flex mx-auto justify-between footer sm:footer-horizontal footer-center text-base-content p-4">
                <aside className='flex items-center gap-2'>
                    <Image src={logo} alt='logo' className='w-8 h-8' />
                    <h2 className='font-bold'>FITLOG</h2>
                </aside>
                <aside>
                    <p>© {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;