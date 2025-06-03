import "./globals.css";
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
      <body>
        <div className="scroll_container" style={{backgroundColor:'rgba(20,20,20,1)'}}>
          
          
          <div>
          {children}
          </div>
       </div>
      </body>
    </html>
  );
}
