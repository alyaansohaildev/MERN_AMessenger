import "./globals.css";
import Navbar from "@/components/NavBar";
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','600'],
  variable: '--font-poppins'

});
export const metadata = {
  title: 'Alyaan Sohail Chat System',
  desription: 'YO'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body style={{
        backgroundImage: `url('/background_portfolio_1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        }}>
        <div className="scroll_container" style={{backgroundColor:'rgba(20,20,20,0.7)'}}>
          <Navbar/>
          
          <div className="padding_2x">
          {children}
          </div>
       </div>
      </body>
    </html>
  );
}
